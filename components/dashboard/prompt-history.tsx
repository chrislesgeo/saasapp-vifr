'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getPromptHistory } from "@/lib/prompts"
import { Copy, Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Markdown from "react-markdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PromptHistoryItem {
  id: string
  prompt: string
  response: string
  created_at: string
}

export function PromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const data = await getPromptHistory()
      setHistory(data)
    } catch (error) {
      console.error("Failed to load history:", error)
      toast({
        title: "Error",
        description: "Failed to load prompt history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Response copied to clipboard",
    })
  }

  return (
    <Card className="w-full bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Prompt History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <HistoryItemSkeleton key={index} />
              ))}
            </div>
          ) : history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No prompts yet</p>
          ) : (
            <div className="space-y-6">
              {history.map((item) => (
                <HistoryItem
                  key={item.created_at}
                  item={item}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function HistoryItem({ item, onCopy }: { item: PromptHistoryItem; onCopy: (text: string) => void }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Prompt</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(item.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">{item.prompt}</p>
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-foreground">Response:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopy(item.response)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <Markdown className="prose prose-invert max-w-none text-foreground">
            {item.response}
          </Markdown>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoryItemSkeleton() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  )
}

