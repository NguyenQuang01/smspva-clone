import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const countries = [
  { name: "United States", flag: "🇺🇸", price: "From $0.20", available: true },
  { name: "Canada", flag: "🇨🇦", price: "From $0.25", available: true },
  { name: "United Kingdom", flag: "🇬🇧", price: "From $0.30", available: true },
  { name: "France", flag: "🇫🇷", price: "From $0.22", available: true },
  { name: "Germany", flag: "🇩🇪", price: "From $0.28", available: true },
  { name: "Spain", flag: "🇪🇸", price: "From $0.24", available: true },
  { name: "Italy", flag: "🇮🇹", price: "From $0.26", available: true },
  { name: "Netherlands", flag: "🇳🇱", price: "From $0.32", available: true },
  { name: "Poland", flag: "🇵🇱", price: "From $0.18", available: true },
  { name: "Russia", flag: "🇷🇺", price: "From $0.15", available: true },
  { name: "Ukraine", flag: "🇺🇦", price: "From $0.16", available: true },
  { name: "India", flag: "🇮🇳", price: "From $0.12", available: true },
]

export function CountryList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Available Countries</CardTitle>
        <p className="text-sm text-muted-foreground">Click here to see all services</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {countries.map((country, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{country.flag}</span>
              <div>
                <p className="font-medium text-sm">{country.name}</p>
                <p className="text-xs text-muted-foreground">{country.price}</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Buy now
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
