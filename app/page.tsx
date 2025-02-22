'use client';

import ChatInput from '@/components/chatInput';
import { useChat } from 'ai/react';

export default function Home() {
  const { handleSubmit, isLoading, handleInputChange, input, append, messages } = useChat();

  return (
    <div className="flex flex-col items-center justify-end min-h-screen pb-10 w-full max-w-2xl mx-auto">
      <ChatInput
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        messages={messages}
        handleChange={handleInputChange}
        input={input}
        append={append}
      />
    </div>
  );
}

