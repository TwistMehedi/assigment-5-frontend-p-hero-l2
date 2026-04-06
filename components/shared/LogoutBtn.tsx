"use client";

import { authClient } from "@/lib/auth-client";
import { useLogOutUserMutation } from "@/redux/api/auth.api";
import { logout } from "@/redux/features/auth.slice";
import { LogOut, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [logOutUser] = useLogOutUserMutation();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: async () => {
            try {
              const result = await logOutUser({}).unwrap();

              dispatch(logout());
              localStorage.removeItem("sessionToken");
              toast.success(result?.message || "Logout successful");
              window.location.href = "/login";
            } catch (err) {
              dispatch(logout());
              window.location.href = "/login";
            }
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Better-Auth Logout failed");
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout Error:", error);
      setIsLoading(false);
      toast.error("Something went wrong during logout");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={logoutHandler}
        disabled={isLoading}
        className="ml-auto p-1.5 text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2 disabled:opacity-50"
        title="Logout"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <LogOut size={16} />
        )}
      </button>
    </div>
  );
};

export default LogoutBtn;
