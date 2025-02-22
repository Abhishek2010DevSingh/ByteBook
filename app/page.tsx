"use client";
import ChatInput from '@/components/chatInput';
import Message from '@/components/Message';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { handleSubmit, isLoading, handleInputChange, input, append, messages, error } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      console.log(error)
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-end min-h-screen pb-10 w-full max-w-2xl mx-auto">
      <div className="flex flex-col w-full overflow-y-auto pb-10">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        <div ref={messagesEndRef} />
      </div>
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

