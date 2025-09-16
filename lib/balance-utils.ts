import { message } from "antd";

const PAYMENT_URL = "http://14.225.205.10:3002/";

export const checkBalanceAndRedirect = (
  userBalance: string,
  requiredAmount: number,
  onInsufficientFunds?: () => void
): boolean => {
  const balance = parseFloat(userBalance) || 0;

  if (balance < requiredAmount) {
    message.warning(`Insufficient balance. Required: $${requiredAmount.toFixed(2)}, Available: $${balance.toFixed(2)}`);

    // Call custom handler if provided
    if (onInsufficientFunds) {
      onInsufficientFunds();
    } else {
      // Default behavior: redirect to payment URL
      window.open(PAYMENT_URL, "_blank");
    }

    return false;
  }

  return true;
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};
