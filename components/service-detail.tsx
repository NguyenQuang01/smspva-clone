"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceDetailProps {
  service: {
    name: string
    icon: string
  }
  onBack: () => void
}

export function ServiceDetail({ service, onBack }: ServiceDetailProps) {
  const getServiceInfo = (serviceName: string) => {
    const serviceData: Record<string, any> = {
      Gmail: {
        fullName: "Google (YouTube, Gmail)",
        description:
          "Get a temporary number for Google (YouTube, Gmail) and keep your privacy safe. Our service provides the ability to receive online SMS messages to verify and activate your account. We suggest using real SIM cards and not virtual VOIP numbers, which guarantees a reliable and stable connection.",
        icon: "📧",
        steps: [
          "To get a number for Google (YouTube, Gmail), you must register on Smspva.com.",
          "Recharge your balance.",
          "Then click on 'Select'.",
          "In the Google (YouTube, Gmail), enter the number and wait for the SMS.",
          "As soon as the message comes to the number, you will immediately receive the code.",
        ],
      },
      WhatsApp: {
        fullName: "WhatsApp",
        description:
          "Get a temporary number for WhatsApp and keep your privacy safe. Our service provides the ability to receive online SMS messages to verify and activate your account. We suggest using real SIM cards and not virtual VOIP numbers, which guarantees a reliable and stable connection.",
        icon: "📱",
        steps: [
          "To get a number for WhatsApp, you must register on Smspva.com.",
          "Recharge your balance.",
          "Then click on 'Select'.",
          "In WhatsApp, enter the number and wait for the SMS.",
          "As soon as the message comes to the number, you will immediately receive the code.",
        ],
      },
      Telegram: {
        fullName: "Telegram",
        description:
          "Get a temporary number for Telegram and keep your privacy safe. Our service provides the ability to receive online SMS messages to verify and activate your account. We suggest using real SIM cards and not virtual VOIP numbers, which guarantees a reliable and stable connection.",
        icon: "✈️",
        steps: [
          "To get a number for Telegram, you must register on Smspva.com.",
          "Recharge your balance.",
          "Then click on 'Select'.",
          "In Telegram, enter the number and wait for the SMS.",
          "As soon as the message comes to the number, you will immediately receive the code.",
        ],
      },
    }

    return (
      serviceData[serviceName] || {
        fullName: serviceName,
        description: `Get a temporary number for ${serviceName} and keep your privacy safe. Our service provides the ability to receive online SMS messages to verify and activate your account. We suggest using real SIM cards and not virtual VOIP numbers, which guarantees a reliable and stable connection.`,
        icon: service.icon,
        steps: [
          `To get a number for ${serviceName}, you must register on Smspva.com.`,
          "Recharge your balance.",
          "Then click on 'Select'.",
          `In ${serviceName}, enter the number and wait for the SMS.`,
          "As soon as the message comes to the number, you will immediately receive the code.",
        ],
      }
    )
  }

  console.log("[v0] ServiceDetail rendering for:", service)
  const serviceInfo = getServiceInfo(service.name)

  return (
    <div className="flex-1 bg-background text-foreground overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Temporary number for <span className="text-primary">{serviceInfo.fullName}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">{serviceInfo.description}</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-all duration-200 hover:scale-105">
            Try it out <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* How to register section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">{serviceInfo.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                How register {serviceInfo.fullName} via SMS?
              </h2>
              <p className="text-muted-foreground">
                Our website provides excellent phone numbers for registering on {serviceInfo.fullName}.
              </p>
            </div>
          </div>
          <ol className="space-y-3">
            {serviceInfo.steps.map((step: string, index: number) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Tips Smspva.com</h3>
            <p className="text-muted-foreground mb-4">
              We write about account registration, the intricacies of working with proxies, and other important topics.
            </p>
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>

          <div className="bg-primary rounded-lg p-6 text-primary-foreground">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-3">📰</span>
              News
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">@smspva_news_official</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">✈️</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMSPVA Android App</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">📱</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <p>
            By logging in to the service, you agree with the{" "}
            <span className="text-primary cursor-pointer hover:underline">Terms</span> and the{" "}
            <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
          </p>
          <p>
            We do not store numbers longer than 24 hours. If you need to receive sms for a long time use{" "}
            <span className="text-primary cursor-pointer hover:underline">Rent numbers</span>.
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
