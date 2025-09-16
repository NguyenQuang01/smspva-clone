"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Star } from "lucide-react";
import apiServices from "@/services/axios";

interface Country {
  id: string;
  countryCode: string;
  countryName: string;
  flagImage?: string;
}

interface Service {
  serviceCode: string;
  serviceName: string;
  serviceImage: string;
  countryCode: string | null;
  countryName: string | null;
  flagImage: string | null;
  minPrice: number;
  maxPrice: number;
  pricePerDay: number;
}

export function RentNumbers() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await apiServices.get("/countriesHaveSim");

        if (response.data) {
          setCountries(response.data);
          if (response.data.length > 0) {
            setSelectedCountry(response.data[0].countryCode);
          }
        }
      } catch (err: any) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch services when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchServicesForCountry(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchServicesForCountry = async (countryCode: string) => {
    try {
      setIsLoadingServices(true);
      setError("");

      const response = await apiServices.get(`/services/${countryCode}`);

      if (response.data) {
        setServices(response.data);
        // Clear selected services when country changes
        setSelectedServices([]);
      } else {
        setServices([]);
      }
    } catch (err: any) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again.");
      setServices([]);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const handleServiceClick = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.serviceCode === service.serviceCode);
      if (isSelected) {
        // Remove if already selected
        return prev.filter((s) => s.serviceCode !== service.serviceCode);
      } else {
        // Add if not selected, but only if we haven't reached the maximum of 3
        if (prev.length < 3) {
          return [...prev, service];
        }
        return prev; // Don't add if already at maximum
      }
    });
  };

  const calculateTotalCost = () => {
    const period = parseInt(selectedPeriod);
    return selectedServices.reduce((total, service) => {
      return total + service.pricePerDay * period;
    }, 0);
  };

  const getAvailableNumbers = () => {
    // Mock data - in real app this would come from API
    return 398;
  };

  const handleRentNumber = async () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }

    try {
      const paymentData = {
        type: "rent.otp.service",
        countryCode: selectedCountry,
        totalCost: calculateTotalCost(),
        rentDuration: parseInt(selectedPeriod),
        provider: "",
        platForm: "api",
        statusCode: "SUCCESS",
        serviceCodes: selectedServices.map((service) => service.serviceCode),
      };

      console.log("Processing rent payment:", paymentData);

      const response = await apiServices.post("/otp", paymentData);

      if (response.data) {
        console.log("Rent payment successful:", response.data);
        alert("Rent number successful!");

        // Clear selected services after successful payment
        setSelectedServices([]);
      }

      if (response.status === 500) {
        alert(response.data?.message || "Rent payment failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Rent payment error:", error);
      alert(error.response?.data?.message || "Rent payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Warning Banner */}

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700">
            Rent number
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground">
            F.A.Q
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground">
            API
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground">
            Archive
          </Button>
        </div>

        {/* Error Message */}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select country</label>
            <Select
              value={selectedCountry}
              onValueChange={setSelectedCountry}>
              <SelectTrigger className="bg-card border-border">
                <SelectValue placeholder={isLoading ? "Loading countries..." : "Select a country"} />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem
                    value="loading"
                    disabled>
                    Loading countries...
                  </SelectItem>
                ) : error ? (
                  <SelectItem
                    value="error"
                    disabled>
                    Error loading countries
                  </SelectItem>
                ) : (
                  countries.map((country) => (
                    <SelectItem
                      key={country.id}
                      value={country.countryCode}>
                      {country.flagImage && <span className="mr-2">🏳️</span>}
                      {country.countryName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select rental period</label>
            <div className="flex space-x-2">
              <Select
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="90">90</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="week(s)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">day(s)</SelectItem>
                  <SelectItem value="week">week(s)</SelectItem>
                  <SelectItem value="month">month(s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-medium mb-2">Total</label>
            <div className="bg-card border border-border rounded-md px-3 py-2 text-sm min-h-[20px]">
              {selectedServices.length === 0 ? (
                <div className="text-muted-foreground">No services selected</div>
              ) : (
                <div className="space-y-2">
                  {selectedServices.map((service) => (
                    <div
                      key={service.serviceCode}
                      className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{service.serviceName}</div>
                        <div className="text-xs text-muted-foreground">
                          Country:{" "}
                          {countries.find((c) => c.countryCode === selectedCountry)?.countryName || selectedCountry},
                          For: {selectedPeriod} week(s)
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(service.pricePerDay * parseInt(selectedPeriod)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total cost:</span>
                      <span className="text-sm font-bold">${calculateTotalCost().toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" items-start">
            <label className="block text-sm font-medium mb-2">Pay</label>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleRentNumber}
              disabled={selectedServices.length === 0 || !selectedCountry}>
              Rent number
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Services</h3>
            <div className="text-sm text-muted-foreground">{selectedServices.length}/3 selected</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
            {isLoadingServices ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                {selectedCountry ? "No services available for selected country" : "Please select a country"}
              </div>
            ) : (
              services.map((service) => {
                const isSelected = selectedServices.some((s) => s.serviceCode === service.serviceCode);
                const isMaxReached = selectedServices.length >= 3 && !isSelected;
                return (
                  <Card
                    key={service.serviceCode}
                    className={`bg-card border-border m-1 p-3 transition-colors ${
                      isMaxReached ? "opacity-50 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
                    } ${isSelected ? "ring-2 ring-teal-500 bg-teal-50" : ""}`}
                    onClick={() => !isMaxReached && handleServiceClick(service)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                          <img
                            src={service.serviceImage}
                            alt={service.serviceName}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                          <span className="text-lg hidden">?</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{service.serviceName}</div>
                          <div className="text-xs text-muted-foreground">
                            Avail. {getAvailableNumbers()} PCS. for ${service.pricePerDay} per day
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
