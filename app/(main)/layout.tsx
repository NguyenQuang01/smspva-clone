"use client";

import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
      <ThemeToggle />
    </div>
  );
}
