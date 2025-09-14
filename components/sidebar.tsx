"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import Link from "next/link";
import apiServices, { apiUrl } from "@/services/axios";
import Image from "next/image";
import { useOrdersContext } from "@/contexts/orders-context";
import { useUserContext } from "@/contexts/user-context";
import { message } from "antd";
export function Sidebar() {
  const [services, setServices] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [countriesError, setCountriesError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Get orders context để có thể refresh orders
  const { refreshOrders } = useOrdersContext();

  // Get user context để có thể refresh user info
  const { fetchUserInfo } = useUserContext();

  // Function to fetch all services
  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiServices.get("services");

      // Kiểm tra nếu response có lỗi
      if (response.status && response.status >= 400) {
        throw new Error(`HTTP ${response.status}: ${response.statusText || "Server Error"}`);
      }

      const data = response.data || response;

      // Xử lý response có thể có cấu trúc khác nhau
      if (Array.isArray(data)) {
        setServices(data);
      } else if (data && Array.isArray(data.data)) {
        setServices(data.data);
      } else if (data && Array.isArray(data.services)) {
        setServices(data.services);
      } else {
        console.warn("Unexpected services data structure:", data);
        setServices([]);
      }
    } catch (err: any) {
      console.error("Error fetching services:", err);
      setError(err.message || "Failed to fetch services");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to search services
  const searchServices = async (query: string) => {
    if (!query.trim()) {
      // If search is empty, load all services
      fetchServices();
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await apiServices.get(`/services/search?name=${encodeURIComponent(query)}`);
      console.log("Search results:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        setServices([]);
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Search failed. Please try again.");
      setServices([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change with debounce
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchServices(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Function to handle payment
  const handleAddFunds = async (country: any) => {
    setIsProcessing(true);
    try {
      const paymentData = {
        type: "buy.otp.service",
        countryCode: country.countryCode,
        totalCost: country.pricePerDay || 0.1,
        rentDuration: 1, // Default duration
        provider: "",
        platForm: "api",
        statusCode: "SUCCESS",
        serviceCodes: [selectedService.code], // Default services
      };

      console.log("Processing payment:", paymentData);

      const response = await apiServices.post("/otp", paymentData);
      console.log("🚀 ~ handleAddFunds ~ response:", response);

      if (response.data) {
        console.log("Payment successful:", response.data);

        // Refresh orders data
        await refreshOrders();

        // Refresh user info
        await fetchUserInfo();
      }
      if (response.status === 500) {
        message.error(response.data?.message || "Payment failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch countries when service is selected
  useEffect(() => {
    if (selectedService?.code) {
      fetchCountries(selectedService.code);
    }
  }, [selectedService]);

  const fetchCountries = async (serviceCode: string) => {
    setCountriesLoading(true);
    setCountriesError(null);

    try {
      const response = await apiServices.get(`countries/${serviceCode}`);
      console.log("Countries API Response:", response);

      // Kiểm tra nếu response có lỗi
      if (response.status && response.status >= 400) {
        throw new Error(`HTTP ${response.status}: ${response.statusText || "Server Error"}`);
      }

      const data = response.data || response;
      console.log("Parsed countries data:", data);

      // Xử lý response có thể có cấu trúc khác nhau
      if (Array.isArray(data)) {
        setCountries(data);
      } else if (data.data && Array.isArray(data.data)) {
        setCountries(data.data);
      } else if (data.countries && Array.isArray(data.countries)) {
        setCountries(data.countries);
      } else {
        console.warn("Unexpected countries API response structure:", data);
        throw new Error("Invalid countries API response structure");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountriesError(error instanceof Error ? error.message : "Failed to fetch countries");
      setCountries([]);
    } finally {
      setCountriesLoading(false);
    }
  };

  const handleServiceClick = (service: any) => {
    console.log("🚀 ~ handleServiceClick ~ service:", service);
    setSelectedService(service);
  };

  return (
    <div className="w-[480px] bg-sidebar border-b border-l border-r border-sidebar-border h-screen flex flex-col rounded-b-2xl k">
      {/* Service Selection */}
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-4 uppercase tracking-wide">Select service</h3>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-input border-border text-foreground focus:border-primary transition-colors"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
          {loading || isSearching
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 px-4 py-4 rounded-md text-xs animate-pulse">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <div className="w-12 h-3 bg-gray-200 rounded"></div>
                </div>
              ))
            : services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`flex flex-col border  border-gray-200 items-center space-y-2 px-4 py-3 rounded-md text-xs transition-all duration-200 hover:scale-105 w-full  ${
                    selectedService?.id === service.id
                      ? "bg-gray-100 text-gray-700 shadow-md border border-gray-200"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-600 border  hover:border-gray-200"
                  }`}>
                  <div className="flex items-center space-x-2 w-full">
                    <Image
                      src={"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg"}
                      // src={apiUrl + service.image}
                      alt={service.text}
                      width={20}
                      height={20}
                      className="flex-shrink-0 "
                    />
                    <span className="text-left leading-tight font-medium truncate flex-1 min-w-0 text-sm">
                      {service.text}
                    </span>
                  </div>
                </button>
              ))}
        </div>
        {error && <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded">{error}</div>}
        {!loading && !isSearching && services.length === 0 && searchQuery && (
          <div className="mt-4 p-2 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded text-center">
            No services found for "{searchQuery}"
          </div>
        )}
      </div>

      {/* Country Selection */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sidebar-foreground uppercase tracking-wide">Select country</h3>
            <Settings className="w-4 h-4 text-muted-foreground hover:text-sidebar-foreground cursor-pointer transition-colors" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 bg-input border-border text-foreground focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 rounded-bl-lg rounded-br-lg overflow">
          <div className="space-y-1 pr-2">
            {!selectedService ? (
              <div className="text-center text-gray-500 py-8">Select a service to view countries</div>
            ) : countriesLoading ? (
              // Loading skeleton for countries
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-5 py-3 rounded-md animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : countriesError ? (
              <div className="text-center text-red-500 py-4">Error: {countriesError}</div>
            ) : countries.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No countries available for this service</div>
            ) : (
              countries.map((country) => (
                <div
                  key={country.id || country.name}
                  className={`flex items-center justify-between px-5 py-3 rounded-md hover:bg-gray-50 hover:text-gray-600 transition-all duration-200 group border border-transparent hover:border-gray-200 `}>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{country.flag || "🏳️"}</span>
                    <span className="text-sm text-gray-700 group-hover:text-gray-600 font-medium">
                      {country.countryName || country.text}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-600">
                      ${country.pricePerDay || "0.00"}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => handleAddFunds(country)}
                      disabled={isProcessing}
                      className="h-8 px-4 text-xs bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm disabled:opacity-50">
                      {isProcessing ? "Processing..." : "Add funds"}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
