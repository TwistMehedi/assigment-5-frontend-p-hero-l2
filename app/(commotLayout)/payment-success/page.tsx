"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useVerifyQuery } from "@/redux/api/payment.api";
import { Loader2, CheckCircle2, Home, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
  } = useVerifyQuery(sessionId as string, { skip: !sessionId });

  const purchasedItem = response?.data;

  useEffect(() => {
    if (isSuccess && purchasedItem) {
      const typeLabel =
        purchasedItem.itemType === "SERIES" ? "Series" : "Movie";
      toast.success(`Payment successful! ${typeLabel} unlocked.`);

      const timeout = setTimeout(() => {
        router.push("/dashboard/user");
      }, 5000);

      return () => clearTimeout(timeout);
    }

    if (isError) {
      toast.error("Payment verification failed. Please contact support.");
    }
  }, [isSuccess, isError, router, purchasedItem]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="bg-card p-10 rounded-3xl border border-border shadow-2xl flex flex-col items-center max-w-md w-full text-center space-y-6">
        {isLoading ? (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h1 className="text-2xl font-black uppercase italic tracking-tighter">
              Verifying Payment...
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Please wait while we confirm your transaction. Do not refresh or
              close this window.
            </p>
          </>
        ) : isSuccess ? (
          <>
            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                Payment Success!
              </h1>
              <p className="text-muted-foreground text-sm font-medium">
                Your{" "}
                <span className="text-foreground font-bold uppercase">
                  {purchasedItem?.itemType}
                </span>{" "}
                has been added to your collection.
              </p>
            </div>

            <div className="flex flex-col w-full gap-3 pt-4">
              <Button
                onClick={() => {
                  const type = purchasedItem?.itemType?.toLowerCase();
                  router.push(`/${type}/${purchasedItem?.itemId}`);
                }}
                className="w-full font-bold uppercase gap-2 py-6 rounded-xl"
              >
                <PlayCircle size={20} /> Start Watching
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full font-bold uppercase gap-2 py-6 rounded-xl border-border"
              >
                <Home size={18} /> Back to Home
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-destructive font-bold uppercase tracking-widest bg-destructive/10 p-4 rounded-xl border border-destructive/20">
              Payment Verification Failed
            </p>
            <Button
              onClick={() => router.push("/")}
              variant="link"
              className="text-muted-foreground uppercase text-xs font-black"
            >
              Go Back Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
