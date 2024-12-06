"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';

export function DashboardHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push("/login");
    }
  };

  return (
    <header className="border-b bg-background text-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Engagement Platform</h1>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </header>
  );
}

