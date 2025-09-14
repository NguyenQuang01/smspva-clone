"use client";

import { Button } from "@/components/ui/button";
import { Globe, ChevronDown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import apiServices from "@/services/axios";
import { useUserContext } from "@/contexts/user-context";

export function Header() {
  const pathname = usePathname();
  const { user, isLoggedIn, userBalance, loading, fetchUserInfo, setUser, setIsLoggedIn, setUserBalance } =
    useUserContext();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setUserBalance(parsedUser.balanceAmount || "0.00");
      setIsLoggedIn(true);

      // Fetch fresh user info from API
      fetchUserInfo();
    }
  }, [fetchUserInfo]);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Don't close if clicking on dropdown content
      if (target.closest(".dropdown-content")) {
        return;
      }

      if (showLangDropdown || showUserDropdown) {
        setShowLangDropdown(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLangDropdown, showUserDropdown]);

  const handleLogout = () => {
    console.log("handleLogout called"); // Debug log
    try {
      // Clear all tokens and user data
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Update state
      setUser(null);
      setIsLoggedIn(false);
      setShowUserDropdown(false);
      setUserBalance("0.00");

      console.log("Logout successful, redirecting...");

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className="bg-card border-b border-border sticky top-0 z-50 relative"
      style={{ overflow: "visible" }}>
      <div
        className="container mx-auto px-4"
        style={{ overflow: "visible" }}>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9u2iGGZuWRHD5Gf09XLaJe0ge70SOM.png"
                alt="SMSPVA"
                className="h-8 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Activations
                </Button>
              </Link>
              <Link href="/rent-numbers">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/rent-numbers" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Rentnumbers
                </Button>
              </Link>
              <Link href="/hq-proxy">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/hq-proxy" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  <span className="relative">
                    <span className="text-red-500 relative -top-0.5 text-xs font-bold">HQ</span>
                    <span>proxy</span>
                  </span>
                </Button>
              </Link>
              <Link href="/partnership">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/partnership" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Partnership
                </Button>
              </Link>
              <Link href="/news">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/news" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  News
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/help" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Help
                </Button>
              </Link>
              <Link href="/referral-program">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium transition-colors p-2 h-auto ${
                    pathname === "/referral-program" ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}>
                  Referralprogram
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium transition-colors p-2 h-auto text-muted-foreground hover:text-primary">
                API
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4 relative">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                onClick={() => setShowLangDropdown(!showLangDropdown)}>
                <Globe className="w-4 h-4" />
                <span className="text-sm">English</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border shadow-lg rounded-md z-50">
                  <div className="py-1">
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">English</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Русский</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Español</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Français</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Deutsch</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">中文</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">日本語</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">한국어</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Português</div>
                    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Italiano</div>
                  </div>
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <div className="relative flex items-center ">
                <div className="text-sm font-semibold text-green-600">${loading ? "..." : userBalance}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.username || user?.name || "User"}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>

                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border shadow-lg rounded-md z-50 dropdown-content">
                    <div className="py-1">
                      <div className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">Settings</div>
                      <div className="border-t my-1"></div>
                      <button
                        type="button"
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer text-left"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Logout button clicked");
                          handleLogout();
                        }}>
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-primary">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
