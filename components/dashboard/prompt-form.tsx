"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPrompt } from "@/lib/prompts";
import { Send } from "lucide-react";

export function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      await createPrompt(prompt);
      setPrompt("");
      toast({
        title: "Success",
        description: "Your prompt has been processed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Create New Prompt</h2>
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading || !prompt.trim()}>
        <Send className="h-4 w-4 mr-2" />
        {isLoading ? "Processing..." : "Generate Response"}
      </Button>
    </form>
  );
}