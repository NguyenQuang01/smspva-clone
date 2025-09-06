"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { RentNumbers } from "@/components/rent-numbers"
import { HQProxy } from "@/components/hq-proxy"
import { Partnership } from "@/components/partnership"
import { News } from "@/components/news"
import { Help } from "@/components/help"
import { ReferralProgram } from "@/components/referral-program"
import { SignUp } from "@/components/sign-up"
import { SignIn } from "@/components/sign-in"
import { ThemeToggle } from "@/components/theme-toggle"
import { CountryDetail } from "@/components/country-detail"
import { ServiceDetail } from "@/components/service-detail"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("activations")
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string
    flag: string
    price: string
    available: boolean
  } | null>(null)
  const [selectedService, setSelectedService] = useState<{
    name: string
    icon: string
  } | null>(null)

  useEffect(() => {
    setSelectedService(null)
    setSelectedCountry(null)
  }, [activeTab])

  const handleServiceSelect = (service: { name: string; icon: string }) => {
    console.log("[v0] Service selected:", service)
    setSelectedService(service)
    setSelectedCountry(null) // Clear country selection when service is selected
  }

  const handleCountrySelect = (country: { name: string; flag: string; price: string; available: boolean }) => {
    console.log("[v0] Country selected:", country)
    setSelectedCountry(country)
    setSelectedService(null) // Clear service selection when country is selected
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "rent-numbers" ? (
        <RentNumbers />
      ) : activeTab === "hq-proxy" ? (
        <HQProxy />
      ) : activeTab === "partnership" ? (
        <Partnership />
      ) : activeTab === "news" ? (
        <News />
      ) : activeTab === "help" ? (
        <Help />
      ) : activeTab === "referral-program" ? (
        <ReferralProgram />
      ) : activeTab === "sign-up" ? (
        <SignUp />
      ) : activeTab === "sign-in" ? (
        <SignIn />
      ) : (
        <div className="flex">
          <Sidebar onCountrySelect={handleCountrySelect} onServiceSelect={handleServiceSelect} />
          {selectedService ? (
            <ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} />
          ) : selectedCountry ? (
            <CountryDetail country={selectedCountry} onBack={() => setSelectedCountry(null)} />
          ) : (
            <MainContent />
          )}
        </div>
      )}
      <ThemeToggle />
    </div>
  )
}
