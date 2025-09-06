import { Card, CardContent } from "@/components/ui/card"
import { Shield, Globe, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Account verification",
    description: "Quickly verify your accounts on popular services with our reliable SMS reception.",
  },
  {
    icon: Globe,
    title: "Over 60 countries",
    description:
      "Our service covers more than 60 countries worldwide, giving you access to numbers from different regions.",
  },
  {
    icon: Clock,
    title: "Instant number selection",
    description: "Get a phone number instantly and start receiving SMS messages right away.",
  },
  {
    icon: Users,
    title: "Privacy protection",
    description: "Protect your privacy by using temporary numbers instead of your personal phone number.",
  },
]

export function Features() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-center">
        SMSpva is one of the first websites for selling phone numbers
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto text-pretty">
        SMSpva provides the opportunity to not short-term phone numbers from different countries at low and affordable
        prices for receiving SMS messages.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
