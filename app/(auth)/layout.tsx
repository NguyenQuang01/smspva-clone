"use client";

import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center p-8">{children}</div>
      <ThemeToggle />
    </div>
  );
}
