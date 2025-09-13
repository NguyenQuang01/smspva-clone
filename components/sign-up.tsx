"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import apiServices from "@/services/axios";

export function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Xử lý đăng ký ở đây
      const response = await apiServices.post("users/register", {
        username: "test",
        email: "test@example.com",
        password: "password",
      });

      console.log("Sign up successful:", response.data);
      // Redirect về trang chính sau khi đăng ký thành công
      router.push("/");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>

      <form
        onSubmit={handleSignUp}
        className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <Input
            type="text"
            className="w-full bg-card border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">E-mail</label>
          <Input
            type="email"
            className="w-full bg-card border-border text-foreground"
          />
          <p className="text-yellow-400 text-sm mt-2">
            ⚠️ We recommend using a real email address for account recovery
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Repeat Password</label>
          <div className="relative">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              className="w-full bg-card border-border text-foreground pr-10"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="text-center">
          <span className="text-muted-foreground">Already have an account? </span>
          <span
            className="text-teal-400 hover:underline cursor-pointer"
            onClick={() => router.push("/sign-in")}>
            Sign in
          </span>
        </div>

        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
