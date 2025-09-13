"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import apiServices from "@/services/axios";

export function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiServices.post("/users/login", formData);
      console.log("Login successful:", response.data);

      // Lưu thông tin user và token vào localStorage
      if (response.data) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.username));
      }

      // Reload trang để cập nhật header
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sign In</h1>

      <form
        onSubmit={handleLogin}
        className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-2">Login / E-mail</label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-card border-border text-foreground"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-card border-border text-foreground pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="text-center">
          <span className="text-muted-foreground">Not registered yet? </span>
          <span
            className="text-teal-400 hover:underline cursor-pointer"
            onClick={() => router.push("/sign-up")}>
            Create an account
          </span>
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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 disabled:opacity-50">
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

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
            className="border-border text-muted-foreground hover:bg-muted bg-transparent">
            <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:bg-muted bg-transparent">
            <div className="w-5 h-5 bg-red-600 rounded mr-2"></div>
            Gmail
          </Button>
        </div>
      </form>
    </div>
  );
}
