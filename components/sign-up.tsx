"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <Input type="text" className="w-full bg-card border-border text-foreground" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">E-mail</label>
            <Input type="email" className="w-full bg-card border-border text-foreground" />
            <p className="text-yellow-400 text-sm mt-2">
              Note: e-mails to hotmail.com, microsoft.com, live.com and outlook.com are delayed and can take longer than
              usual to arrive. We recommend using Gmail to sign up.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="w-full bg-card border-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Repeat password</label>
            <div className="relative">
              <Input
                type={showRepeatPassword ? "text" : "password"}
                className="w-full bg-card border-border text-foreground pr-10"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* CAPTCHA */}
          <div className="border border-border rounded p-4 flex items-center justify-between bg-card">
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-green-500 rounded mr-3 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span>Success!</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <div>CLOUDFLARE</div>
              <div>Privacy • Terms</div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            At registration you agree with{" "}
            <span className="text-teal-400 hover:underline cursor-pointer">
              The rules and regulations of SmsPVA.com
            </span>
          </p>

          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">Sign up now</Button>
        </div>
      </div>
    </div>
  )
}
