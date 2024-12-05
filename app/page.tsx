import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-contain text-pretty bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 md:leading-relaxed tracking-tight">
          AI-Powered Customer Engagement
        </h1>
       
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Transform your customer interactions with AI
        </p>
        <Link href="/login">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}