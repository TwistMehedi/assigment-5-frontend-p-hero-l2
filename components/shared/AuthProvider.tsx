"use client";

import { authClient, Session } from "@/lib/auth-client";
// import { useSocialLoginMutation } from "@/redux/api/auth.api";
import { setCredentials } from "@/redux/features/auth.slice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  // const [socialLogin] = useSocialLoginMutation();

  const { data, isPending } = authClient.useSession();

  const session = data as Session | null;
  console.log("AuthProvider session:", session);
  const userId = useSelector((state: any) => state?.auth?.user?.id);

  useEffect(() => {
    if (session?.user && !isPending && session?.user?.id !== userId) {
      const syncBackend = async () => {
        try {
          // const result = await socialLogin(session).unwrap();
          dispatch(
            setCredentials({
              user: session?.user,
              cookies: {
                // token: result?.cookies?.token,
                // refreshToken: result?.cookies?.refreshToken,
                sessionToken: session?.session.token,
              },
            }),
          );
        } catch (err) {
          console.error("Backend sync failed:", err);
        }
      };
      syncBackend();
    }
  }, [session, isPending, dispatch, userId]);

  return <>{children}</>;
};
