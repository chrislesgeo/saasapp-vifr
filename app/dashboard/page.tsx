"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PromptForm } from "@/components/dashboard/prompt-form";
import { PromptHistory } from "@/components/dashboard/prompt-history";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { session, error } = await getSession();
      if (error || !session) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <PromptForm />
          <PromptHistory />
        </div>
      </main>
    </div>
  );
}