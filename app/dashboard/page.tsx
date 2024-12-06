import { getSession } from "@/lib/auth";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { PromptForm } from "@/components/dashboard/prompt-form";
import { PromptHistory } from "@/components/dashboard/prompt-history";
import { DashboardHeader } from "@/components/dashboard/header";
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { session, error } = await getSession();

  if (error || !session) {
    redirect("/login");
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

