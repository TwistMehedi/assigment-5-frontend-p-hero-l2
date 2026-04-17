"use client";

import Loading from "@/app/loading";
import { authClient } from "@/lib/auth-client";
import { useSocialLoginMutation } from "@/redux/api/auth.api";
import { setCredentials } from "@/redux/features/auth.slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);

  const dispatch = useDispatch();
  const [socialLogin] = useSocialLoginMutation();

  const user = useSelector((state: RootState) => state.auth.user);
  const backendToken = useSelector(
    (state: RootState) => state.auth.cookies?.sessionToken,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!isPending) {
      setHasInitialLoaded(true);
    }

    if (session?.user && (!user || !backendToken)) {
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
          console.error("Backend sync failed:", err);
        }
      };
      syncBackend();
    }
  }, [
    session,
    isPending,
    isMounted,
    backendToken,
    user,
    dispatch,
    socialLogin,
  ]);

  if (!isMounted || (!hasInitialLoaded && isPending)) {
    return <Loading />;
  }

  return <>{children}</>;
};
