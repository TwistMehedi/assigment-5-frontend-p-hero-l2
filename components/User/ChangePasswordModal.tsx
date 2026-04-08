"use client";
import React, { useState } from "react";
import { KeyRound, X, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const user = useSelector((state: any) => state.auth?.user);

  const hasLocalPassword: boolean = user?.hasPassword !== false;
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = hasLocalPassword
        ? {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }
        : {
            newPassword: formData.newPassword,
          };

      const result = await changePassword(payload).unwrap();
      toast.success(result?.message || "Password updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <KeyRound size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {hasLocalPassword ? "Change Password" : "Set New Password"}
          </h2>
        </div>

        {!hasLocalPassword && (
          <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg mb-6 border border-amber-100">
            You logged in via Google. Set a password to enable email login.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className={hasLocalPassword ? "space-y-5" : "space-y-5 mt-4"}
        >
          {hasLocalPassword && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold disabled:opacity-70 flex justify-center items-center shadow-md transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : hasLocalPassword ? (
                "Update Password"
              ) : (
                "Set Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
