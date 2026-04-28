import React, { useState } from 'react';
import { ChatInterface } from './ChatInterface.js';
import { MessageCircle, X } from 'lucide-react';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div
          className="mb-4 w-[350px] md:w-[400px] animate-in fade-in zoom-in duration-300"
        >
          <ChatInterface />
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6a00] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};
