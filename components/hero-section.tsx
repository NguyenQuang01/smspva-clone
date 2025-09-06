import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Receive SMS Online - SmsPva</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Receive SMS online to temporary numbers from all over the world
        </p>

        <Button size="lg" className="mb-12">
          Buy a number
        </Button>

        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="font-semibold">
            We are trusted by more than 150,000 paying customers, and that number continues to grow...
          </span>
        </div>

        <div className="text-center">
          <span className="text-2xl font-bold">150,000+ users</span>
          <p className="text-sm text-muted-foreground">Highest success rates on the market today</p>
        </div>
      </div>
    </section>
  )
}
