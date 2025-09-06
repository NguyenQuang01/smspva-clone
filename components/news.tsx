import { Button } from "@/components/ui/button"

export function News() {
  const newsItems = [
    {
      date: "20/08/25 | 12:04",
      title: "Price Drop on Israel Numbers!",
      description:
        "Dear Users, We've significantly reduced the cost of receiving SMS on Israel numbers in the activation section. This limited-time offer won't last long—hurry to take...",
      flag: "🇮🇱",
      id: 1,
    },
    {
      date: "27/08/25 | 14:08",
      title: "Malaysian Numbers Available for Rent!",
      description:
        "Dear Users! Great news: Malaysian numbers are now available in the rental section! Fast activation and limited stock. Hurry to rent while numbers are still available!",
      flag: "🇲🇾",
      id: 2,
    },
    {
      date: "27/08/25 | 09:55",
      title: "Malaysian Numbers Available for Rent!",
      description:
        "Dear Users! Great news: Malaysian numbers are now available in the rental section! Fast activation and limited stock. Hurry to rent while numbers are still available!",
      flag: "🇲🇾",
      id: 3,
    },
    {
      date: "14/08/25 | 15:41",
      title: "Price Reduction on Ireland Numbers!",
      description:
        "Dear Users, We are excited to announce a price reduction of over 20% on the rental of Ireland numbers! Take advantage of this unique opportunity to rent a number...",
      flag: "🇮🇪",
      id: 4,
    },
    {
      date: "20/07/25 | 13:21",
      title: "20% Discount on Ireland Numbers!",
      description:
        "Dear Users! In the activation section, Ireland numbers for receiving SMS are now 20% cheaper! Hurry to get your codes at a great price!",
      flag: "🇮🇪",
      id: 5,
    },
    {
      date: "20/07/25 | 17:05",
      title: "Voice Code Service Expansion: More Countries Added!",
      description:
        "Following our recent update on July 25, we're thrilled to expand our voice code reception service even further! Now including: Spain, Poland, Latvia, Lithuania,...",
      flag: "🎵",
      id: 6,
    },
    {
      date: "25/07/25 | 19:53",
      title: "Enhanced Service: Expanded Voice Code Reception!",
      description:
        "We are excited to announce an upgrade to our voice code reception service! New countries now included are: Mexico, Portugal, Australia, Bangladesh, Indonesia,...",
      flag: "🎵",
      id: 7,
    },
    {
      date: "23/07/25 | 14:12",
      title: "Hong Kong Numbers Now Available in the Activation...",
      description:
        "Dear Users, We are excited to announce that Hong Kong numbers have been added to the activation section that can now receive activation codes on hundreds...",
      flag: "🇭🇰",
      id: 8,
    },
    {
      date: "23/07/25 | 10:46",
      title: "Summer Discount on Malta Numbers! Hurry!",
      description:
        "Dear Users, Malta numbers are now available with a 25% discount in the activation and rental sections! This is the perfect opportunity to rent a number for the long...",
      flag: "🇲🇹",
      id: 9,
    },
    {
      date: "15/07/25 | 16:01",
      title: "Special Offer on Malta Numbers — Act Now!",
      description:
        "Dear Users, Special prices on Malta numbers are now available in the rental and activation section! This is a perfect opportunity to get a number and activation...",
      flag: "🇲🇹",
      id: 10,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">News</h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg p-6 hover:bg-muted transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">Read more →</Button>
                </div>
                <div className="ml-4 text-4xl">{item.flag}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={
                page === 1 ? "bg-teal-600 hover:bg-teal-700" : "border-border text-muted-foreground hover:bg-muted"
              }
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
