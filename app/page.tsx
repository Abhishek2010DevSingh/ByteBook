"use client";
import ChatInput from "@/components/chatInput";
import { useChat } from "ai/react";

export default function Home() {
  const { handleSubmit, isLoading, handleInputChange, input } = useChat();
  return <div className="flex flex-col items-center justify-between pb-40">
    <ChatInput
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      handleChange={handleInputChange}
      message={input}
    />
  </div>
}
