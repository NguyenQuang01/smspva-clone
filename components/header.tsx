"use client";

import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9u2iGGZuWRHD5Gf09XLaJe0ge70SOM.png"
                alt="SMSPVA"
                className="h-8 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Activations
                </Button>
              </Link>
              <Link href="/rent-numbers">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/rent-numbers" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Rentnumbers
                </Button>
              </Link>
              <Link href="/hq-proxy">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/hq-proxy" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  <span className="relative">
                    <span className="text-red-500 relative -top-0.5 text-xs font-bold">HQ</span>
                    <span>proxy</span>
                  </span>
                </Button>
              </Link>
              <Link href="/partnership">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/partnership" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Partnership
                </Button>
              </Link>
              <Link href="/news">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/news" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  News
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/help" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Help
                </Button>
              </Link>
              <Link href="/referral-program">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/referral-program" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Referralprogram
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium transition-colors p-2 h-auto text-muted-foreground hover:text-primary">
                API
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">English</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Русский</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Deutsch</DropdownMenuItem>
                <DropdownMenuItem>中文</DropdownMenuItem>
                <DropdownMenuItem>日本語</DropdownMenuItem>
                <DropdownMenuItem>한국어</DropdownMenuItem>
                <DropdownMenuItem>Português</DropdownMenuItem>
                <DropdownMenuItem>Italiano</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/sign-up">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary">
                Sign Up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
