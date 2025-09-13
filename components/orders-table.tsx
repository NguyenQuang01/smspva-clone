"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Volume2, Copy, RefreshCw } from "lucide-react";
import apiServices from "@/services/axios";

interface Order {
  id: string;
  service: string;
  phoneNumber: string;
  activationCode: string;
  status: "active" | "completed" | "expired";
  createdAt: string;
  expiresAt: string;
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock data for now - replace with actual API call
      const mockOrders: Order[] = [
        {
          id: "1",
          service: "WhatsApp",
          phoneNumber: "+1 234 567 8900",
          activationCode: "123456",
          status: "active",
          createdAt: "2024-01-15T10:30:00Z",
          expiresAt: "2024-01-15T11:30:00Z",
        },
        {
          id: "2",
          service: "Telegram",
          phoneNumber: "+44 20 7946 0958",
          activationCode: "789012",
          status: "completed",
          createdAt: "2024-01-15T09:15:00Z",
          expiresAt: "2024-01-15T10:15:00Z",
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const handleRefresh = () => {
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "completed":
        return "text-blue-500";
      case "expired":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-foreground">Orders</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Phone number</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Activation code</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="text-muted-foreground">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center">
                    <div className="text-red-500">
                      <p>Error: {error}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchOrders}
                        className="mt-2">
                        Try Again
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center">
                    <div className="text-muted-foreground">
                      <p className="text-lg">No active orders</p>
                      <p className="text-sm mt-1">Your orders will appear here once you create them</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-border hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium">📱</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.service}</p>
                          <p className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-foreground">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-foreground">{order.activationCode}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(order.activationCode)}
                          className="h-6 w-6 p-0 hover:bg-muted">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs">
                          View Details
                        </Button>
                        {order.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
