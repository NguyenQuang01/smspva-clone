"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ReferralProgram() {
  const [activeProgram, setActiveProgram] = useState("users")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Referral program SmsPva</h1>

          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">Choose your SmsPva referral program</p>
            <div className="flex justify-center">
              <div className="bg-card rounded-lg p-1 flex">
                <Button
                  onClick={() => setActiveProgram("developers")}
                  variant={activeProgram === "developers" ? "default" : "ghost"}
                  className={activeProgram === "developers" ? "bg-muted" : "text-muted-foreground"}
                >
                  For developers
                </Button>
                <Button
                  onClick={() => setActiveProgram("users")}
                  variant={activeProgram === "users" ? "default" : "ghost"}
                  className={
                    activeProgram === "users" ? "bg-gradient-to-r from-orange-500 to-red-500" : "text-muted-foreground"
                  }
                >
                  For users 🔒
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Get money for attracted users!</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="text-green-400 font-bold">1.</span> You receive{" "}
                  <span className="text-green-400">6%</span> for each referral purchase in the Activation section.
                </p>
                <p>
                  <span className="text-green-400 font-bold">1.1.</span> You receive{" "}
                  <span className="text-green-400">6%</span> for each new order in the Rental section.
                </p>
                <p>
                  <span className="text-green-400 font-bold">2.</span> The referral is attached to you for 3 months.
                </p>
                <p className="text-sm">after this period the deductions from its purchases cease to be made.</p>
                <p>
                  <span className="text-green-400 font-bold">3.</span> The maximum amount of deduction from one referral
                  is 300 USD.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">You are not authorized!</h2>
              <p className="text-muted-foreground mb-4">
                To participate in the referral program and view information about the people you refer, you must{" "}
                <span className="text-teal-400 cursor-pointer hover:underline">log in</span> or{" "}
                <span className="text-teal-400 cursor-pointer hover:underline">register</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
