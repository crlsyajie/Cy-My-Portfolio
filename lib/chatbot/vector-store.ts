import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';
import knowledgeBase from './knowledge-base.json';

export interface KnowledgeItem {
  category: string;
  content: string;
  embedding?: number[];
}

class VectorStore {
  private extractor: FeatureExtractionPipeline | null = null;
  private items: KnowledgeItem[] = (knowledgeBase as any).knowledge_base || [];

  async init() {
    if (!this.extractor) {
      this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

      // Pre-calculate embeddings for the knowledge base
      for (const item of this.items) {
        if (!item.embedding) {
          const output = await this.extractor(item.content, { pooling: 'mean', normalize: true });
          item.embedding = Array.from(output.data as Float32Array);
        }
      }
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < a.length; i++) {
      const valA = a[i] ?? 0;
      const valB = b[i] ?? 0;
      dotProduct += valA * valB;
      mA += valA * valA;
      mB += valB * valB;
    }
    return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
  }

  async search(query: string, topK: number = 3): Promise<KnowledgeItem[]> {
    await this.init();
    if (!this.extractor) throw new Error('Extractor not initialized');

    const output = await this.extractor(query, { pooling: 'mean', normalize: true });
    const queryEmbedding = Array.from(output.data as Float32Array);

    const scoredItems = this.items.map(item => ({
      ...item,
      score: this.cosineSimilarity(queryEmbedding, item.embedding!)
    }));

    return scoredItems
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, topK);
  }
}

export const vectorStore = new VectorStore();
