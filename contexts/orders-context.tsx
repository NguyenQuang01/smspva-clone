"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { fetchOrders, Order } from "@/services/orders-api";

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalElements: number;
  refreshOrders: () => Promise<void>;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTotalPages: (pages: number) => void;
  setTotalElements: (elements: number) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const refreshOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchOrders(0, 10);

      if (result.error) {
        setError(result.error);
        setOrders([]);
      } else {
        setOrders(result.orders);
        setTotalPages(result.totalPages);
        setTotalElements(result.totalElements);
      }
    } catch (err: any) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: OrdersContextType = useMemo(
    () => ({
      orders,
      loading,
      error,
      totalPages,
      totalElements,
      refreshOrders,
      setOrders,
      setLoading,
      setError,
      setTotalPages,
      setTotalElements,
    }),
    [orders, loading, error, totalPages, totalElements, refreshOrders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrdersContext() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrdersContext must be used within an OrdersProvider");
  }
  return context;
}
