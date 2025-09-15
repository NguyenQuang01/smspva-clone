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

export function RentNumbers() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(true);
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

          <div>
            <label className="block text-sm font-medium mb-2">Total</label>
            <div className="bg-card border border-border rounded-md px-3 py-2 text-sm">Free SMS service</div>
          </div>

          <div className="flex items-end">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Rent number</Button>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Available Countries</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">Loading countries...</div>
            ) : countries.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">No countries available</div>
            ) : (
              countries.map((country) => (
                <Card
                  key={country.id}
                  className={`bg-card border-border p-3 hover:bg-muted transition-colors cursor-pointer ${
                    selectedCountry === country.countryCode ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedCountry(country.countryCode)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                        <span className="text-lg">🏳️</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{country.countryName}</div>
                        <div className="text-xs text-muted-foreground">{country.countryCode}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Star className="w-4 h-4 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
