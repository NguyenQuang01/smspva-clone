import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Star } from "lucide-react"

const services = [
  { name: "OTHER", price: "from $0.05", available: true, icon: "🔵" },
  { name: "Facebook", price: "from $0.10", available: true, icon: "📘" },
  { name: "ROZETKA", price: "from $0.05", available: true, icon: "🛒" },
  { name: "Binance", price: "from $0.15", available: true, icon: "⚡" },
  { name: "Telegram", price: "from $0.05", available: true, icon: "✈️" },
  { name: "Tinder & Badoo & similar", price: "from $0.15", available: true, icon: "❤️" },
  { name: "Uber & UberEats & similar", price: "from $0.10", available: true, icon: "🚗" },
  { name: "Viber", price: "from $0.05", available: true, icon: "💜" },
  { name: "Instagram", price: "from $0.10", available: true, icon: "📷" },
  { name: "Airbnb", price: "from $0.15", available: true, icon: "🏠" },
  { name: "WhatsApp", price: "from $0.10", available: true, icon: "💚" },
  { name: "Skype", price: "from $0.05", available: true, icon: "🔵" },
  { name: "Alibaba Group", price: "from $0.10", available: true, icon: "🛍️" },
  { name: "Amazon", price: "from $0.15", available: true, icon: "📦" },
  { name: "Apple", price: "from $0.20", available: true, icon: "🍎" },
  { name: "Google", price: "from $0.10", available: true, icon: "🔍" },
  { name: "Microsoft", price: "from $0.15", available: true, icon: "🪟" },
  { name: "Twitter", price: "from $0.10", available: true, icon: "🐦" },
  { name: "LinkedIn", price: "from $0.15", available: true, icon: "💼" },
  { name: "Discord", price: "from $0.10", available: true, icon: "🎮" },
  { name: "TikTok", price: "from $0.15", available: true, icon: "🎵" },
  { name: "Snapchat", price: "from $0.10", available: true, icon: "👻" },
  { name: "Netflix", price: "from $0.20", available: true, icon: "🎬" },
  { name: "Spotify", price: "from $0.15", available: true, icon: "🎶" },
]

export function RentNumbers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Warning Banner */}
      <div className="bg-amber-600 text-black px-4 py-2 text-center text-sm">
        We do not serve clients from the Russian Federation.
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Rent number
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            F.A.Q
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            API
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Archive
          </Button>
        </div>

        {/* Warning Messages */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Always select numbers</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Cancellation of numbers up to public form 10 minutes</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Search types of numbers, priority for strong select numbers</span>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select country</label>
            <Select>
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="UK, Kingdom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uk">UK, Kingdom</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select rental period</label>
            <Select>
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder="4 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="4h">4 hours</SelectItem>
                <SelectItem value="24h">24 hours</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Total</label>
            <div className="bg-card border border-border rounded-md px-3 py-2 text-sm">Free SMS service</div>
          </div>

          <div className="flex items-end">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Rent number</Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Services</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-amber-500 text-black hover:bg-amber-600">
                Most popular
              </Button>
              <Button variant="outline" size="sm" className="border-border text-muted-foreground bg-transparent">
                Filter by service
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                      <span className="text-lg">{service.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-muted-foreground">{service.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {service.available && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                    <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Message */}
        <div className="text-center text-sm text-muted-foreground">
          Didn't find the service you need? Write to our support and we will add it today
        </div>
      </div>
    </div>
  )
}
