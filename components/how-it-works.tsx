import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageSquare, CreditCard } from "lucide-react"

const steps = [
  {
    icon: CreditCard,
    title: "Get the temp number",
    description: "Choose the service you want to get SMS for and select a country. You will need to do 3 simple steps.",
  },
  {
    icon: MessageSquare,
    title: "Send SMS to the phone number",
    description: "Use the number you received to register on the service you need.",
  },
  {
    icon: Phone,
    title: "Get an SMS on the website",
    description: "After receiving the SMS, you can see the verification code on our website.",
  },
]

export function HowItWorks() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">How use the SMSpva?</h2>
      <p className="text-muted-foreground mb-8">
        To get a temporary number for receiving sms, you will need to do 3 simple steps
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
