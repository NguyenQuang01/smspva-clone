"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CountryDetailProps {
  country: {
    name: string
    flag: string
    price: string
    available: boolean
  }
  onBack: () => void
}

export function CountryDetail({ country, onBack }: CountryDetailProps) {
  const services = [
    { name: "Telegram", icon: "✈️", price: "$2.40", available: 28 },
    { name: "WhatsApp", icon: "📱", price: "$3.25", available: 100 },
    { name: "Yahoo", icon: "🟣", price: "$1.00", available: 1052 },
    { name: "POF", icon: "🐟", price: "$0.80", available: 1539 },
    { name: "Google (YouTube)", icon: "📧", price: "$2.00", available: 984 },
    { name: "Facebook", icon: "📘", price: "$1.50", available: 124 },
    { name: "Ticketmaster", icon: "🎫", price: "$0.50", available: 286 },
    { name: "Hinge", icon: "💕", price: "$0.95", available: 512 },
    { name: "Tinder", icon: "🔥", price: "$1.35", available: 412 },
    { name: "Amazon", icon: "🛒", price: "$0.50", available: 556 },
    { name: "TikTok", icon: "🎵", price: "$1.50", available: 527 },
    { name: "Match", icon: "💖", price: "$1.50", available: 490 },
  ]

  return (
    <div className="flex-1 bg-background text-foreground overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-4 hover:bg-accent">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            Temporary number in <span className="text-primary">{country.name}</span>
            <span className="ml-2 text-2xl">{country.flag}</span>
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 text-muted-foreground">
          <p>
            Need a temporary number in {country.name}? Let us take care of it! With our service, you get a number in{" "}
            {country.name} that you can use to receive SMS messages. It can be for registering on a website, in mobile
            applications or just to keep your phone number private.
          </p>
        </div>

        {/* About Country Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="text-6xl">{country.flag}</div>
            <div>
              <h2 className="text-xl font-bold mb-3">About {country.name}</h2>
              <p className="text-muted-foreground leading-relaxed">
                The {country.name} is a vast country consisting of 50 states, occupies a significant part of North
                America. Activated SMS verification to ensure seamless access to a variety of online services in the
                USA. Prominent platforms in the country, such as Amazon and Facebook require a valid phone number for
                registration, making our service essential.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By purchasing a temporary phone number from SmsPva, you gain several advantages. Our virtual phone
                numbers are linked to real SIM cards, ensuring reliable SMS delivery and secure verification. Enhance
                the security of your account, protect your privacy, and enjoy convenient access to popular services in
                the USA.
              </p>
            </div>
          </div>
        </div>

        {/* Top-selling Services */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Top-selling services in {country.name}</h2>
          <p className="text-muted-foreground mb-6">
            Discover the most popular services for SMS verification, social networks, applications, and Internet
            services. Find a temporary number to receive SMS from popular services or select others.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{service.available}</div>
                    <div className="text-xs text-muted-foreground">Price</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">{service.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Tips Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Tips Smspva.com</h3>
            <p className="text-muted-foreground text-sm mb-4">
              We write about account registration, the intricacies of working with services, and other important topics.
            </p>
            <div className="bg-accent rounded-lg p-4">
              <div className="text-4xl mb-2">📄</div>
            </div>
          </div>

          {/* News Section */}
          <div className="bg-primary rounded-lg p-6 text-primary-foreground">
            <h3 className="text-lg font-bold mb-4">News</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-primary-foreground/10 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📰</div>
                  <span className="text-sm">@smspva_news_official</span>
                </div>
                <Button size="sm" variant="secondary" className="text-xs">
                  →
                </Button>
              </div>
              <div className="flex items-center justify-between bg-primary-foreground/10 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">✈️</div>
                  <span className="text-sm">SMSPVA Android App</span>
                </div>
                <Button size="sm" variant="secondary" className="text-xs">
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-xs text-muted-foreground space-y-2">
          <p>
            By logging in to the service, you agree with the{" "}
            <span className="text-primary cursor-pointer hover:underline">Terms</span> and the{" "}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
          </p>
          <p>
            We do not store numbers longer than <strong>24 hours</strong>. If you need to receive sms for a long time
            use <span className="text-primary cursor-pointer hover:underline">Rent numbers</span>.
          </p>
          <p>
            Our official telegram channel{" "}
            <span className="text-primary cursor-pointer hover:underline">@smspva_news_official</span> where you will be
            the first to know about price changes and news.
          </p>
        </div>
      </div>
    </div>
  )
}
