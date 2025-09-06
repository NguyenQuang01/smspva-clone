import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shield, Globe, Zap } from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "WhatsApp",
    description: "Receive SMS for WhatsApp verification",
  },
  {
    icon: Shield,
    title: "Google",
    description: "Get SMS codes for Google services",
  },
  {
    icon: Globe,
    title: "Telegram",
    description: "Verify Telegram accounts instantly",
  },
  {
    icon: Zap,
    title: "Instagram",
    description: "Quick Instagram verification codes",
  },
]

export function ServicesSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
