"use client";

import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";
import { OrdersProvider } from "@/contexts/orders-context";
import { UserProvider } from "@/contexts/user-context";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <OrdersProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <div className="flex">
            <div className="flex-1         ">{children}</div>
          </div>
          <ThemeToggle />
        </div>
      </OrdersProvider>
    </UserProvider>
  );
}
