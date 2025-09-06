"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Sign In</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Login / E-mail</label>
            <Input type="text" className="w-full bg-card border-border text-foreground" />
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

          <div className="text-center">
            <span className="text-muted-foreground">Not registered yet? </span>
            <span className="text-teal-400 hover:underline cursor-pointer">Create an account</span>
          </div>

          {/* CAPTCHA */}
          <div className="border border-border rounded p-4 flex items-center justify-between bg-card">
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-green-500 rounded mr-3 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span>Verifying...</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <div>CLOUDFLARE</div>
              <div>Privacy • Terms</div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-teal-400 hover:underline cursor-pointer text-sm">Forgot password?</span>
          </div>

          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">Sign In</Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or sign in using</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:bg-muted bg-transparent"
            >
              <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:bg-muted bg-transparent"
            >
              <div className="w-5 h-5 bg-red-600 rounded mr-2"></div>
              Gmail
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
