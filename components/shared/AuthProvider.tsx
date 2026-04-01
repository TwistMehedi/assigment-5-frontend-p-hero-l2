"use client";

import { authClient } from "@/lib/auth-client";
import { logout, setCredentials } from "@/redux/features/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPending && session?.user) {
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
    } else if (!isPending && !session) {
      dispatch(logout());
    }
  }, [session, dispatch, isPending]);

  return <>{children}</>;
};
