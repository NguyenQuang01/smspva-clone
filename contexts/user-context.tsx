"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import apiServices from "@/services/axios";

interface User {
  id?: string;
  username?: string;
  name?: string;
  email?: string;
  balanceAmount?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  userBalance: string;
  loading: boolean;
  error: string | null;
  fetchUserInfo: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserBalance: (balance: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState<string>("0.00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiServices.get("/users/info");

      if (response.data) {
        setUser(response.data);
        setUserBalance(response.data.balanceAmount || "0.00");
        setIsLoggedIn(true);

        // Update localStorage with fresh data
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Failed to fetch user info");

      // Fallback to localStorage data
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setUserBalance(parsedUser.balanceAmount || "0.00");
          setIsLoggedIn(true);
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
          setUser(null);
          setIsLoggedIn(false);
          setUserBalance("0.00");
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setUserBalance("0.00");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const value: UserContextType = useMemo(
    () => ({
      user,
      isLoggedIn,
      userBalance,
      loading,
      error,
      fetchUserInfo,
      setUser,
      setIsLoggedIn,
      setUserBalance,
      setLoading,
      setError,
    }),
    [user, isLoggedIn, userBalance, loading, error, fetchUserInfo]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
