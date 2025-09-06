"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

const countries = [
  { name: "Albania", flag: "🇦🇱" },
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Azerbaijan", flag: "🇦🇿" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Belarus", flag: "🇧🇾" },
  { name: "Bolivia", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Brasil", flag: "🇧🇷" },
  { name: "Bulgaria", flag: "🇧🇬" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "China", flag: "🇨🇳" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Cuba", flag: "🇨🇺" },
  { name: "Cyprus", flag: "🇨🇾" },
  { name: "Czech", flag: "🇨🇿" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Estonia", flag: "🇪🇪" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Great Britain", flag: "🇬🇧" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Island", flag: "🇮🇸" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Jamaica", flag: "🇯🇲" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Latvia", flag: "🇱🇻" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Lithuania", flag: "🇱🇹" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Moldova", flag: "🇲🇩" },
  { name: "Monaco", flag: "🇲🇨" },
  { name: "Mongolia", flag: "🇲🇳" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Paraguay", flag: "🇵🇾" },
  { name: "Peru", flag: "🇵🇪" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Seychelles", flag: "🇸🇨" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenia", flag: "🇸🇮" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Turkmenistan", flag: "🇹🇲" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Uruguay", flag: "🇺🇾" },
  { name: "USA", flag: "🇺🇸", selected: true },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Venezuela", flag: "🇻🇪" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Zambia", flag: "🇿🇲" },
]

const faqData = [
  {
    question: "For what purposes is it forbidden to use our proxies?",
    answer: [
      "Fraud, burglaries, insults, threats and slander;",
      "Password selection (bruteforce), scan, and Port vulnerability;",
      "Phishing;",
      "Spam (including Spam on forums, Websites, Blogs), any activity that would result in the IP address of the server BLACK Sheets (BlackList-ы, SpamHaus, StopForumSpam, SpamCop etc.);",
      "E-mail Newsletter;",
      "Spreading Malware (viruses, trojans and anything that can affect the work of the Software);",
      "Hack Websites and search for vulnerabilities (including sql-inj;",
      "Distribution of materials without the knowledge of the rights holder (Video, Music, Software, etc.);",
      "Violation of the laws of the country where the Server to which you are connecting is located;",
    ],
  },
  {
    question: "What protocols do your proxies support?",
    answer: [
      "Our proxies support all necessary protocols for work: HTTP, HTTPS, SOCKS, data on which will be provided to you after purchase.",
    ],
  },
  {
    question: "Can I get a refund for a proxy?",
    answer: [
      "A refund for a proxy can only be made if the proxy is not working. If the proxies are technically working, no refund is made.",
    ],
  },
  {
    question: "How to set up a proxy in the Android device",
    answer: [
      "1. Open your Android's Settings.",
      "2. Tap Wi-Fi.",
      "3. Tap and hold the Wi-Fi Network Name.",
      "4. Select Modify Network.",
      "5. Click Advanced Options.",
      "6. Tap Manual.",
      "7. Change your proxy's settings. Enter the hostname and proxy port (e.g. 127.0.0.1:3101).",
      "8. Tap Save.",
    ],
  },
  {
    question: "How to set up a proxy in the iPhone device",
    answer: [
      "1. Open your iPhone settings",
      "2. Tap Wi-Fi",
      "3. Select the Info icon on the right side",
      "4. Scroll down to the HTTP Proxy Configure Proxy",
      "5. Tap Manual",
      "6. Edit your proxy settings - e.g. Server - us.smartproxy.com, Port - 10101. Turn on authentication if network IP is not whitelisted in the dashboard and add your Username and Password",
      "7. Tap back to Wi-Fi selection window. This will save your proxy settings",
    ],
  },
  {
    question: "How to set up a proxy in Windows 10",
    answer: [
      "1. To setup proxy on Windows 10 operating system, click on windows logo and search for change proxy settings.",
      "2. In the proxy settings window, scroll down to Manual proxy setup section and make sure Use a proxy server is turned on.",
      "3. Next, fill in Address and Port fields with the desired endpoint and click on save.",
    ],
  },
]

export function HQProxy() {
  const [activeTab, setActiveTab] = useState("order")
  const [searchTerm, setSearchTerm] = useState("")
  const [rentalDays, setRentalDays] = useState([5])
  const [quantity, setQuantity] = useState([1])
  const [selectedCountry, setSelectedCountry] = useState("USA")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPrice = rentalDays[0] * quantity[0] * 0.53 // Base calculation

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          <Button
            variant={activeTab === "order" ? "default" : "ghost"}
            onClick={() => setActiveTab("order")}
            className="text-foreground"
          >
            Order
          </Button>
          <Button
            variant={activeTab === "faq" ? "default" : "ghost"}
            onClick={() => setActiveTab("faq")}
            className="text-foreground"
          >
            F.A.Q.
          </Button>
        </div>

        {/* Warning Message */}
        <div className="bg-orange-600 text-white p-4 rounded-lg mb-6">
          ⚠️ Proxies are not allowed to be used in illegal activities, responsibility when using a proxy lies with the
          buyer. Our proxies are suitable only for white purposes.
        </div>

        {/* Main Content */}
        {activeTab === "faq" ? (
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 bg-teal-600 hover:bg-teal-700 transition-colors text-left text-white"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-card">
                    <ul className="space-y-2">
                      {faq.answer.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground">
                          {item.startsWith("•") || item.match(/^\d+\./) ? item : `• ${item}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Country Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">1. Select proxy country</h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search country by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border text-foreground"
                />
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto custom-scrollbar">
                {filteredCountries.map((country) => (
                  <Button
                    key={country.name}
                    variant={selectedCountry === country.name ? "default" : "ghost"}
                    className={`flex items-center space-x-2 p-3 justify-start text-left ${
                      selectedCountry === country.name
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "bg-card hover:bg-muted text-foreground"
                    }`}
                    onClick={() => setSelectedCountry(country.name)}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm">{country.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Rental Period */}
            <div>
              <h3 className="text-lg font-semibold mb-4">2. Select rental period days</h3>
              <div className="bg-card p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-teal-400 font-semibold">{rentalDays[0]}</span>
                  <span className="text-muted-foreground">360</span>
                </div>
                <Slider
                  value={rentalDays}
                  onValueChange={setRentalDays}
                  max={360}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>1</span>
                  <span>60</span>
                  <span>120</span>
                  <span>180</span>
                  <span>240</span>
                  <span>300</span>
                  <span>360</span>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-4">3. Select quantity</h3>
              <div className="bg-card p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-teal-400 font-semibold">{quantity[0]}</span>
                  <span className="text-muted-foreground">1,000</span>
                </div>
                <Slider value={quantity} onValueChange={setQuantity} max={1000} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>251</span>
                  <span>501</span>
                  <span>750</span>
                  <span>1,000</span>
                </div>
              </div>
            </div>

            {/* Total and Buy */}
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">Total</h4>
                  <p className="text-muted-foreground">Price: {totalPrice.toFixed(0)} USD</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-2">Buy</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
