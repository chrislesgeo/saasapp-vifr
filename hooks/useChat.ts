import { useState, useCallback, useRef, useEffect } from 'react';
import { generateResponse } from '@/lib/gemini';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    addMessage(content, true);
    setIsLoading(true);

    try {
      const response = await generateResponse(content);
      addMessage(response, false);
    } catch (error: any) {
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    messagesEndRef,
  };
}