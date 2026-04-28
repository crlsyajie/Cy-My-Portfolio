import React from 'react';
import { cn } from '../../lib/utils.js';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isBot = role === 'bot';

  return (
    <div
      className={cn(
        "mb-4 flex w-full",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm transition-all",
          isBot
            ? "bg-white/5 border border-white/10 text-white"
            : "bg-[#ff6a00] text-white"
        )}
        style={isBot ? { backdropFilter: 'blur(10px)' } : {}}
      >
        {content}
      </div>
    </div>
  );
};
