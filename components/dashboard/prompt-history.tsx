"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPromptHistory } from "@/lib/prompts";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptHistoryItem {
  id: string;
  prompt: string;
  response: string;
  created_at: string;
}

export function PromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getPromptHistory();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Response copied to clipboard",
    });
  };

  if (isLoading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">History</h2>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No prompts yet</p>
        ) : (
          <div className="space-y-8">
            {history.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Prompt:</p>
                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{item.prompt}</p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium">Response:</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(item.response)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{item.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}