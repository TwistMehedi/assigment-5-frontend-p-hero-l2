"use client";

import React, { useState, useEffect } from "react";
import { X, Save, ShieldCheck, Info, Loader2 } from "lucide-react";
import { useUpdateSeriesAdminMutation } from "@/redux/api/series.api";
import { toast } from "react-toastify";

interface EditSeriesModalProps {
  series: any;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export default function EditSeriesModal({
  series,
  isOpen,
  onClose,
  refetch,
}: EditSeriesModalProps) {
  const [isPremium, setIsPremium] = useState(false);

  const [updateSeriesAdmin, { isLoading }] = useUpdateSeriesAdminMutation();

  useEffect(() => {
    if (series) {
      setIsPremium(series.isPremium);
    }
  }, [series]);

  if (!isOpen || !series) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateSeriesAdmin({
        id: series.id,
        isPremium,
      }).unwrap();
      refetch();
      toast.success(result.message);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-card border-2 border-border w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        <div className="px-8 py-7 border-b-2 border-border flex justify-between items-center bg-muted/20">
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              Access <span className="text-primary italic">Control</span>
            </h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-1 italic">
              Production: {series.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-muted hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-border"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl items-start">
            <Info className="text-primary shrink-0" size={18} />
            <p className="text-[10px] font-bold leading-tight uppercase text-muted-foreground italic">
              Only the subscription status can be modified by the administrator.
              Other metadata is managed by the content creator.
            </p>
          </div>

          <div
            onClick={() => setIsPremium(!isPremium)}
            className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all cursor-pointer group ${
              isPremium
                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                : "bg-muted/40 border-border hover:border-primary/40"
            }`}
          >
            <div
              className={`p-4 rounded-2xl transition-all ${
                isPremium
                  ? "bg-primary text-black"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <ShieldCheck size={28} strokeWidth={2.5} />
            </div>

            <div className="flex-1">
              <p
                className={`text-lg font-black uppercase italic leading-none mb-1 ${
                  isPremium ? "text-primary" : "text-foreground"
                }`}
              >
                {isPremium ? "Premium Series" : "Public Series"}
              </p>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">
                {isPremium
                  ? "Paid Membership Required"
                  : "Available for all users"}
              </p>
            </div>

            <div
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isPremium ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {isPremium && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-border/50">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-black font-black uppercase py-5 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 tracking-tighter disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} strokeWidth={3} />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} strokeWidth={3} /> Update Status
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 border-2 border-border font-black uppercase py-5 rounded-[1.5rem] hover:bg-muted transition-all text-muted-foreground hover:text-foreground tracking-tighter"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
