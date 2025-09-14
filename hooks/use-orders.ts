import { useState, useEffect, useCallback } from "react";
import { fetchOrders, Order } from "@/services/orders-api";

export function useOrders(page: number = 1, size: number = 10) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchOrders(page, size);

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
  }, [page, size]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    totalPages,
    totalElements,
    loadOrders, // Export function để có thể gọi từ bên ngoài
  };
}
