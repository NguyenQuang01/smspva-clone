"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, CreditCard, DollarSign, Loader2 } from "lucide-react";
import apiServices from "@/services/axios";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricePerDay?: number;
  countryName?: string;
  serviceCode?: string;
}

export function AddFundsModal({ isOpen, onClose, pricePerDay = 0.05, countryName, serviceCode }: AddFundsModalProps) {
  const [amount, setAmount] = useState<any>(1);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");

  // Credit packages (số lượng credits) - tính giá dựa trên pricePerDay
  const packages = [
    { id: "100", credits: 100, bonus: 0 },
    { id: "200", credits: 200, bonus: 0 },
    { id: "500", credits: 500, bonus: 20 },
    { id: "1000", credits: 1000, bonus: 50 },
    { id: "2000", credits: 2000, bonus: 120 },
    { id: "5000", credits: 5000, bonus: 350 },
    { id: "10000", credits: 10000, bonus: 800 },
    { id: "20000", credits: 20000, bonus: 2000 },
  ].map((pkg) => ({
    ...pkg,
    price: pkg.credits * pricePerDay,
  }));

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setSelectedPackage("");
  };

  const handlePackageSelect = (pkg: (typeof packages)[0]) => {
    setSelectedPackage(pkg.id);
    setAmount(pkg.credits.toString());
  };

  const handleCustomAmount = () => {
    setSelectedPackage("");
  };

  const calculateTotal = () => {
    const numAmount = parseFloat(amount) || 0;
    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

    if (selectedPkg) {
      return {
        credits: selectedPkg.credits,
        price: selectedPkg.price,
        bonus: selectedPkg.bonus,
        totalCredits: selectedPkg.credits + selectedPkg.bonus,
      };
    } else {
      // Custom amount - tính giá dựa trên pricePerDay
      const price = numAmount * pricePerDay;
      return {
        credits: numAmount,
        price: price,
        bonus: 0,
        totalCredits: numAmount,
      };
    }
  };

  const handleBuy = async () => {
    const total = calculateTotal();
    setIsProcessing(true);
    setPaymentError("");

    try {
      // Gọi API thanh toán
      const paymentData = {
        serviceCode: serviceCode,
        countryCode: countryName,
        totalCost: total.price,
        rentDuration: total.totalCredits, // Sử dụng credits làm duration
      };

      console.log("Processing payment:", paymentData);

      const response = await apiServices.post("/otp", paymentData);

      if (response.data) {
        console.log("Payment successful:", response.data);
        alert(`Payment successful! You received ${total.totalCredits} credits.`);
        onClose();

        // Refresh user balance (có thể gọi lại API user info)
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentError(error.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Add Funds - {countryName}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Package Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Credits Package</h3>
            <div className="grid grid-cols-2 gap-2">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedPackage === pkg.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <div className="font-medium">{pkg.credits.toLocaleString()} credits</div>
                  <div className="text-xs text-gray-500">
                    ${pkg.price} {pkg.bonus > 0 ? `+${pkg.bonus} bonus` : ""}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <h3 className="text-sm font-medium mb-3">Custom Credits</h3>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Enter credits"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1"
                min="1"
                step="1"
              />
              <Button
                variant="outline"
                onClick={handleCustomAmount}
                disabled={!amount}>
                Custom
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">1 credit = ${pricePerDay.toFixed(2)}</p>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-medium">Payment Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Credits:</span>
              <span>{total.credits.toLocaleString()}</span>
            </div>
            {total.bonus > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Bonus:</span>
                <span>+{total.bonus.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium">
                <span>Total Credits:</span>
                <span>{total.totalCredits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Price:</span>
                <span>${total.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {paymentError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{paymentError}</p>
            </div>
          )}

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-medium mb-3">Payment Method</h3>
            <div className="space-y-2">
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-3">
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
              </button>
              <button className="w-full p-3 border rounded-lg hover:bg-gray-50 flex items-center space-x-3">
                <DollarSign className="w-5 h-5" />
                <span>PayPal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            className="flex-1">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Buy ${total.totalCredits.toLocaleString()} Credits - $${total.price.toFixed(2)}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
