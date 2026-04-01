"use client";

import { Button } from "@/components/ui/button";
import { useCheckoutMutation } from "@/redux/api/payment.api";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface PaymentButtonProps {
  itemId: string;
  itemType: "movie" | "series";
  price: number;
  title: string;
}

const PaymentButton = ({
  itemId,
  itemType,
  price,
  title,
}: PaymentButtonProps) => {
  const [checkout, { isLoading }] = useCheckoutMutation();

  const handleCheckout = async () => {
    try {
      const result = await checkout({
        itemId,
        itemType,
        price,
        title,
      }).unwrap();

       if (result.success) {
      window.location.href = result?.data?.url;
    }
    } catch (error: any) {
      if (error?.status === 400 && error?.data?.message?.includes("already unlocked")) {
      toast.info("You already own this! Redirecting to watch...");
      
     setTimeout(() => {
        window.location.href = `/${itemType}/${itemId}`;
      }, 1500);
      return;
    }

      toast.error(
        error?.data?.message || "Something went wrong with the payment!",
      );
     console.error("Payment Error:", error);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full cursor-pointer h-14 font-bold gap-2 uppercase tracking-widest transition-all active:scale-95"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <CreditCard size={24} /> Pay Stripe
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
