// Example: How to use the orders API service in other components

import { useState, useEffect } from "react";
import { fetchOrders, getOrderById, getOrdersByService, getOrdersByCountry, Order } from "@/services/orders-api";

// Example 1: Basic usage in a component
export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const result = await fetchOrders(0, 10);
      if (!result.error) {
        setOrders(result.orders);
      }
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          {order.service} - {order.phoneNumber}
        </div>
      ))}
    </div>
  );
}

// Example 2: Get specific order by ID
export function OrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
    };

    loadOrder();
  }, [orderId]);

  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h2>Order: {order.service}</h2>
      <p>Phone: {order.phoneNumber}</p>
      <p>Status: {order.status}</p>
    </div>
  );
}

// Example 3: Filter orders by service
export function TinderOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadTinderOrders = async () => {
      const tinderOrders = await getOrdersByService("TINDER");
      setOrders(tinderOrders);
    };

    loadTinderOrders();
  }, []);

  return (
    <div>
      <h2>Tinder Orders ({orders.length})</h2>
      {orders.map((order) => (
        <div key={order.id}>
          {order.phoneNumber} - {order.status}
        </div>
      ))}
    </div>
  );
}

// Example 4: Filter orders by country
export function JapanOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadJapanOrders = async () => {
      const japanOrders = await getOrdersByCountry("JPN");
      setOrders(japanOrders);
    };

    loadJapanOrders();
  }, []);

  return (
    <div>
      <h2>Japan Orders ({orders.length})</h2>
      {orders.map((order) => (
        <div key={order.id}>
          {order.service} - {order.phoneNumber}
        </div>
      ))}
    </div>
  );
}

// Example 5: Custom hook for orders
export function useOrders(page: number = 0, size: number = 10) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const loadOrders = async () => {
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
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, size]);

  return {
    orders,
    loading,
    error,
    totalPages,
    totalElements,
    refetch: loadOrders,
  };
}

// Example 6: Using the custom hook
export function OrdersWithHook() {
  const { orders, loading, error, refetch } = useOrders(0, 10);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {orders.map((order) => (
        <div key={order.id}>
          {order.service} - {order.phoneNumber}
        </div>
      ))}
    </div>
  );
}
