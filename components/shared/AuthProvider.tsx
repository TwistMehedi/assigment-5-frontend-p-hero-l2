"use client";

import { authClient } from "@/lib/auth-client";
import { setCredentials } from "@/redux/features/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();

  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPending || !isMounted) return;

    if (session?.user) {
      dispatch(
        setCredentials({
          user: {
            ...session.user,
            role: (session.user as any).role,
            status: (session.user as any).status,
          },
          cookies: {
            sessionToken: session?.session?.token,
          },
        }),
      );
    }
  }, [session, isPending, isMounted]);

  if (!isMounted) return null;

  return <>{children}</>;
};
