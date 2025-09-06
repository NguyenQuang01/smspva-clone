"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings } from "lucide-react"

interface SidebarProps {
  onCountrySelect?: (country: {
    name: string
    flag: string
    price: string
    available: boolean
  }) => void
  onServiceSelect?: (service: {
    name: string
    icon: string
  }) => void
}

export function Sidebar({ onCountrySelect, onServiceSelect }: SidebarProps) {
  const services = [
    { name: "WhatsApp", icon: "📱", active: true },
    { name: "Telegram", icon: "✈️" },
    { name: "Instagram", icon: "📷" },
    { name: "Viber", icon: "💜" },
    { name: "VK", icon: "🔵" },
    { name: "Facebook", icon: "📘" },
    { name: "Twitter", icon: "🐦" },
    { name: "Gmail", icon: "📧" },
    { name: "Yahoo", icon: "🟣" },
    { name: "Skype", icon: "💙" },
    { name: "Line", icon: "💚" },
    { name: "Amazon", icon: "🛒" },
    { name: "Apple", icon: "🍎" },
    { name: "Microsoft", icon: "🪟" },
    { name: "Discord", icon: "🎮" },
    { name: "TikTok", icon: "🎵" },
    { name: "Snapchat", icon: "👻" },
    { name: "LinkedIn", icon: "💼" },
  ]

  const countries = [
    { name: "United States", flag: "🇺🇸", price: "$0.40", available: true },
    { name: "Canada", flag: "🇨🇦", price: "$0.40", available: true },
    { name: "United Kingdom", flag: "🇬🇧", price: "$0.07", available: true },
    { name: "France", flag: "🇫🇷", price: "$0.09", available: true },
    { name: "Germany", flag: "🇩🇪", price: "$0.09", available: true },
    { name: "Italy", flag: "🇮🇹", price: "$0.09", available: true },
    { name: "Spain", flag: "🇪🇸", price: "$0.09", available: true },
    { name: "Netherlands", flag: "🇳🇱", price: "$0.09", available: true },
    { name: "Belgium", flag: "🇧🇪", price: "$0.09", available: true },
    { name: "Austria", flag: "🇦🇹", price: "$0.09", available: true },
    { name: "Australia", flag: "🇦🇺", price: "$0.09", available: true },
    { name: "Bulgaria", flag: "🇧🇬", price: "$0.04", available: true },
    { name: "Bolivia", flag: "🇧🇴", price: "$0.04", available: true },
    { name: "Cambodia", flag: "🇰🇭", price: "$0.23", available: true },
    { name: "Brazil", flag: "🇧🇷", price: "$0.12", available: true },
    { name: "Argentina", flag: "🇦🇷", price: "$0.08", available: true },
    { name: "Chile", flag: "🇨🇱", price: "$0.10", available: true },
    { name: "Colombia", flag: "🇨🇴", price: "$0.09", available: true },
    { name: "Mexico", flag: "🇲🇽", price: "$0.11", available: true },
    { name: "Peru", flag: "🇵🇪", price: "$0.07", available: true },
    { name: "Venezuela", flag: "🇻🇪", price: "$0.06", available: true },
    { name: "India", flag: "🇮🇳", price: "$0.05", available: true },
    { name: "China", flag: "🇨🇳", price: "$0.15", available: true },
    { name: "Japan", flag: "🇯🇵", price: "$0.18", available: true },
    { name: "South Korea", flag: "🇰🇷", price: "$0.16", available: true },
    { name: "Thailand", flag: "🇹🇭", price: "$0.08", available: true },
    { name: "Vietnam", flag: "🇻🇳", price: "$0.07", available: true },
    { name: "Philippines", flag: "🇵🇭", price: "$0.09", available: true },
    { name: "Indonesia", flag: "🇮🇩", price: "$0.06", available: true },
    { name: "Malaysia", flag: "🇲🇾", price: "$0.10", available: true },
    { name: "Singapore", flag: "🇸🇬", price: "$0.20", available: true },
    { name: "Russia", flag: "🇷🇺", price: "$0.03", available: false },
    { name: "Ukraine", flag: "🇺🇦", price: "$0.04", available: true },
    { name: "Poland", flag: "🇵🇱", price: "$0.08", available: true },
    { name: "Czech Republic", flag: "🇨🇿", price: "$0.07", available: true },
    { name: "Hungary", flag: "🇭🇺", price: "$0.06", available: true },
    { name: "Romania", flag: "🇷🇴", price: "$0.05", available: true },
    { name: "Turkey", flag: "🇹🇷", price: "$0.04", available: true },
    { name: "Egypt", flag: "🇪🇬", price: "$0.05", available: true },
    { name: "South Africa", flag: "🇿🇦", price: "$0.08", available: true },
    { name: "Nigeria", flag: "🇳🇬", price: "$0.06", available: true },
    { name: "Kenya", flag: "🇰🇪", price: "$0.07", available: true },
    { name: "Morocco", flag: "🇲🇦", price: "$0.05", available: true },
    { name: "Israel", flag: "🇮🇱", price: "$0.12", available: true },
    { name: "Saudi Arabia", flag: "🇸🇦", price: "$0.14", available: true },
    { name: "UAE", flag: "🇦🇪", price: "$0.16", available: true },
    { name: "Pakistan", flag: "🇵🇰", price: "$0.04", available: true },
    { name: "Bangladesh", flag: "🇧🇩", price: "$0.03", available: true },
    { name: "Sri Lanka", flag: "🇱🇰", price: "$0.05", available: true },
    { name: "New Zealand", flag: "🇳🇿", price: "$0.15", available: true },
  ]

  return (
    <div className="w-[480px] bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Service Selection */}
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-4 uppercase tracking-wide">Select service</h3>
        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => onServiceSelect?.(service)}
              className={`flex flex-col items-center space-y-2 px-4 py-4 rounded-md text-xs transition-all duration-200 hover:scale-105 ${
                service.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-transparent hover:border-sidebar-border"
              }`}
            >
              <span className="text-lg">{service.icon}</span>
              <span className="text-center leading-tight font-medium">{service.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground cursor-pointer hover:text-sidebar-foreground transition-colors">
          Click here to view all services
        </div>
      </div>

      {/* Country Selection */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sidebar-foreground uppercase tracking-wide">Select country</h3>
            <Settings className="w-4 h-4 text-muted-foreground hover:text-sidebar-foreground cursor-pointer transition-colors" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 bg-input border-border text-foreground focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-1 pr-2">
            {countries.map((country) => (
              <div
                key={country.name}
                className={`flex items-center justify-between px-5 py-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 cursor-pointer group border border-transparent hover:border-sidebar-border ${
                  !country.available ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl">{country.flag}</span>
                  <span className="text-sm text-sidebar-foreground group-hover:text-sidebar-accent-foreground font-medium">
                    {country.name}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground">
                    {country.price}
                  </span>
                  <Button
                    size="sm"
                    disabled={!country.available}
                    onClick={() => country.available && onCountrySelect?.(country)}
                    className="h-8 px-4 text-xs bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {country.available ? "Receive SMS" : "Unavailable"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
