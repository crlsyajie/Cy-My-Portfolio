import { useState, useCallback } from 'react';
import { vectorStore } from '../lib/chatbot/vector-store';
import type { KnowledgeItem } from '../lib/chatbot/vector-store';
import { pipeline, Text2TextGenerationPipeline } from '@xenova/transformers';

export interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hi! I\'m Carlos\'s AI assistant. Ask me anything about his work, skills, or projects!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [generator, setGenerator] = useState<Text2TextGenerationPipeline | null>(null);

  const initGenerator = useCallback(async () => {
    if (!generator) {
      const gen = (await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-78M')) as Text2TextGenerationPipeline;
      setGenerator(gen);
      return gen;
    }
    return generator;
  }, [generator]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 1. Retrieve relevant context
      const contextItems = await vectorStore.search(content);
      const context = contextItems.map((item: KnowledgeItem) => item.content).join(' ');

      // 2. Initialize generator
      const gen = await initGenerator();

      // 3. Generate response
      const prompt = `Context: ${context}\n\nQuestion: ${content}\n\nAnswer:`;
      const output = await gen(prompt, {
        max_new_tokens: 100,
        temperature: 0.7,
        repetition_penalty: 1.2,
      });

      const generatedText = Array.isArray(output)
        ? (output[0] as any).generated_text
        : (output as any).generated_text;

      const botMessage: Message = {
        role: 'bot',
        content: generatedText
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
}
