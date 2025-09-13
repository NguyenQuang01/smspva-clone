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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiServices.post("users/register", {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      console.log("Sign up successful:", response.data);
      // Redirect về trang chính sau khi đăng ký thành công
      router.push("/");
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>

      <form
        onSubmit={handleSignUp}
        className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full bg-card border-border text-foreground"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full bg-card border-border text-foreground"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
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
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 disabled:opacity-50">
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
