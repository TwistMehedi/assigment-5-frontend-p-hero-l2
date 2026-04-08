"use client";

import { authClient } from "@/lib/auth-client";
import { useSocialLoginMutation } from "@/redux/api/auth.api";
import { setCredentials } from "@/redux/features/auth.slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();

  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();

  const [socialLogin] = useSocialLoginMutation();

  const backendToken = useSelector(
    (state: RootState) => state.auth.cookies?.sessionToken,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPending || !isMounted || !session?.user) return;

    if (backendToken) {
      dispatch(
        setCredentials({
          user: { ...session.user } as any,
          cookies: { sessionToken: session?.session?.token },
        }),
      );
      return;
    }

    const syncBackend = async () => {
      try {
        const result = await socialLogin(session).unwrap();
        dispatch(
          setCredentials({
            user: result?.data?.user,
            cookies: {
              token: result?.cookies?.token,
              refreshToken: result?.cookies?.refreshToken,
              sessionToken: result?.cookies?.sessionToken,
            },
          }),
        );
      } catch (err) {
        console.error("Backend Sync Failed:", err);
      }
    };

    syncBackend();
  }, [session, isPending, isMounted, backendToken, dispatch, socialLogin]);

  if (!isMounted) return null;

  return <>{children}</>;
};
