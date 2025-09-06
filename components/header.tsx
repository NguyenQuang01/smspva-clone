"use client"

import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
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
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "activations" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("activations")}
              >
                Activations
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "rent-numbers" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("rent-numbers")}
              >
                Rentnumbers
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "hq-proxy" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("hq-proxy")}
              >
                <span className="relative">
                  <span className="text-red-500 relative -top-0.5 text-xs font-bold">HQ</span>
                  <span>proxy</span>
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "partnership" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("partnership")}
              >
                Partnership
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "news" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("news")}
              >
                News
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "help" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("help")}
              >
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "referral-program" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("referral-program")}
              >
                Referralprogram
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium transition-colors p-0 h-auto ${
                  activeTab === "api" ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("api")}
              >
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
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">English</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
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
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary"
              onClick={() => setActiveTab("sign-up")}
            >
              Sign Up
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab("sign-in")}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
