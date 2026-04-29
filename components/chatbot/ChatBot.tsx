"use client";
import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { MessageCircle, X } from 'lucide-react';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {isOpen && (
        <div
          className="mb-4 w-[350px] md:w-[400px] animate-in fade-in zoom-in duration-300"
        >
          <ChatInterface />
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6a00] text-white shadow-2xl transition-all hover:scale-110 active:scale-95 overflow-hidden"
      >
        {isOpen ? (
          <X className="h-7 w-7 z-10" />
        ) : (
          <div className="relative h-full w-full flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Carlos Logo"
              className="h-10 w-10 object-contain transition-transform group-hover:rotate-12"
            />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </button>
    </div>
  );
};
