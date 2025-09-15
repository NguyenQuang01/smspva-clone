import apiServices from "./axios";

export interface StockItem {
  phone: string;
  provider: string;
  serviceCode: string;
  messages: any;
  expiredAt: string;
}

export interface ApiOrder {
  id: string;
  type: string;
  cost: number;
  stock: StockItem[];
  accountId: number;
  isRefund: any;
  isActive: any;
  createdAt: string;
  updatedAt: string;
  discountRate: any;
  countryCode: string;
  statusCode: string;
  platform: string;
  __v: any;
}

export interface ApiResponse {
  "buy.otp.service": ApiOrder[];
}

export interface Order {
  id: string;
  service: string;
  phoneNumber: string;
  activationCode: string;
  status: "active" | "completed" | "expired";
  createdAt: string;
  expiresAt: string;
  cost?: number;
  countryCode?: string;
}

// Helper function to map API status to our Order status
const mapApiStatusToOrderStatus = (apiStatus: string): "active" | "completed" | "expired" => {
  switch (apiStatus.toLowerCase()) {
    case "active":
    case "pending":
    case "waiting":
      return "active";
    case "completed":
    case "success":
    case "finished":
      return "completed";
    case "expired":
    case "timeout":
    case "cancelled":
      return "expired";
    default:
      return "active";
  }
};

// Transform API data to our Order interface
const transformApiDataToOrders = (apiData: ApiResponse): Order[] => {
  const ordersData = apiData["buy.otp.service"];
  const transformedOrders: Order[] = [];

  ordersData.forEach((apiOrder: ApiOrder) => {
    apiOrder.stock.forEach((stockItem: StockItem, index: number) => {
      transformedOrders.push({
        id: `${apiOrder.id}-${index}`, // Unique ID for each stock item
        service: stockItem.serviceCode,
        phoneNumber: stockItem.phone,
        activationCode: stockItem.messages?.code || "N/A",
        status: mapApiStatusToOrderStatus(apiOrder.statusCode),
        createdAt: apiOrder.createdAt,
        expiresAt: stockItem.expiredAt,
        cost: apiOrder.cost,
        countryCode: apiOrder.countryCode,
      });
    });
  });

  return transformedOrders;
};

// Main function to fetch orders
export const fetchOrders = async (
  page: number = 0,
  size: number = 10
): Promise<{
  orders: Order[];
  totalPages: number;
  totalElements: number;
  error?: string;
}> => {
  try {
    const response = await apiServices.get(`/otp/order?page=${page}&size=${size}`);

    if (response.data && response.data["buy.otp.service"]) {
      const apiData: ApiResponse = response.data;
      const transformedOrders = transformApiDataToOrders(apiData);

      return {
        orders: transformedOrders,
        totalPages: 1, // API doesn't seem to return pagination info
        totalElements: transformedOrders.length,
      };
    }

    return {
      orders: [],
      totalPages: 0,
      totalElements: 0,
    };
  } catch (err: any) {
    console.error("Error fetching orders:", err);
    return {
      orders: [],
      totalPages: 0,
      totalElements: 0,
      error: "Failed to fetch orders",
    };
  }
};

// Function to get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const result = await fetchOrders();
    const order = result.orders.find((o) => o.id === orderId);
    return order || null;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};

// Function to get orders by service
export const getOrdersByService = async (serviceCode: string): Promise<Order[]> => {
  try {
    const result = await fetchOrders();
    return result.orders.filter((order) => order.service === serviceCode);
  } catch (error) {
    console.error("Error fetching orders by service:", error);
    return [];
  }
};

// Function to get orders by country
export const getOrdersByCountry = async (countryCode: string): Promise<Order[]> => {
  try {
    const result = await fetchOrders();
    return result.orders.filter((order) => order.countryCode === countryCode);
  } catch (error) {
    console.error("Error fetching orders by country:", error);
    return [];
  }
};
