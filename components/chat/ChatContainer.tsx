import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { InitialForm } from './InitialForm';

export function ChatContainer() {
  const { messages, isLoading, sendMessage, messagesEndRef } = useChat();
  const { toast } = useToast();
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = async (content: string) => {
    try {
      await sendMessage(content);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInitialSubmit = async (content: string) => {
    setShowChat(true);
    await handleSubmit(content);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            key="form"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full"
          >
            <InitialForm onSubmit={handleInitialSubmit} isLoading={isLoading} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}