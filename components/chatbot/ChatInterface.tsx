import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../../hooks/use-chatbot';
import type { Message } from '../../hooks/use-chatbot';
import { ChatMessage } from './ChatMessage';
import { Send, Loader2, Instagram, Facebook } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatbot();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-[400px] w-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold text-[#ff6a00]">Carlos Assistant</h3>
          <p className="text-[10px] text-white/50">Running locally via Transformers.js</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/crls_brook?igsh=MTE5bjJiaTM0Zmdzdw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#ff6a00] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/share/18nwGKjCYv/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#ff6a00] transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {messages.map((msg: Message, i: number) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#ff6a00]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00] transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#ff6a00] hover:bg-[#ff8c2a] disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
