"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPrompt } from "@/lib/prompts";
import { Send, Copy, Check } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(""); // Clear previous response
    try {
      const result = await createPrompt(prompt);
      setPrompt("");
      setResponse(result.response); // Assume createPrompt returns the API response
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setIsCopied(true);
      toast({
        title: "Copied",
        description: "Response copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
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

      {response && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">API Response:</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={isCopied}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {isCopied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{response}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

