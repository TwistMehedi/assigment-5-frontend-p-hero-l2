"use client";

import Loading from "@/app/loading";
import { authClient, Session } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAdmin<T extends object>(Component: React.ComponentType<T>) {
  return function AuthWrapper(props: T) {
    const { data, isPending } = authClient.useSession();

    const session = data as Session | null;

    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);

    const allowedRoles = ["ADMIN", "USER", "CREATOR"];

    console.log("withAdmin session", session);
    useEffect(() => {
      if (isPending) {
        return;
      }

      if (!session) {
        console.log("No active session found");
        router.replace("/login");
        return;
      }

      if (!session || !allowedRoles.includes(session?.user?.role)) {
        router.replace("/");
      } else {
        setShouldRender(true);
      }
    }, [session, isPending, router]);

    const isAuthorized =
      (!isPending && session?.user?.role === "ADMIN") ||
      session?.user?.role === "USER" ||
      session?.user?.role === "CREATOR";

    console.log("isAuthorized", isAuthorized);

    return (
      <AnimatePresence mode="wait">
        {isAuthorized && shouldRender ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Component {...props} />
          </motion.div>
        ) : (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background flex items-center justify-center no-header-footer"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
}
