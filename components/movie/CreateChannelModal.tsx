"use client";

import React, { useState, useEffect } from "react";

import {
  X,
  Tv,
  MapPin,
  AlignLeft,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Upload,
} from "lucide-react";
import { channelSchema } from "@/types/zod/movie/channelSchema";
import {
  useCreateChannelMutation,
  useUpdateChannelMutation,
} from "@/redux/api/movieApi";
import { toast } from "react-toastify";
import { IChannel } from "@/types/interface/movie.interface";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IChannel | null;
}

export default function CreateChannelModal({
  isOpen,
  onClose,
  initialData,
}: CreateChannelModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [createChannel, { isLoading }] = useCreateChannelMutation();
  const [updateChannel, { isLoading: isUpdating }] = useUpdateChannelMutation();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        location: initialData.location,
        description: initialData.description || "",
      });
      setPreview(initialData.image);
    } else {
      setFormData({ name: "", location: "", description: "" });
      setPreview(null);
    }
  }, [initialData, isOpen]);
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: "File size must be under 5MB" }));
        setPreview(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setErrors((prev) => {
          const newErr = { ...prev };
          delete newErr.logo;
          return newErr;
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = channelSchema.safeParse(formData);
    if (!result.success) {
      let formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    const channelData = new FormData();
    channelData.append("name", result.data.name);
    channelData.append("location", result.data.location);
    channelData.append("description", result.data.description || "");

    if (imageFile) {
      channelData.append("image", imageFile);
    } else if (!initialData) {
      setErrors((prev) => ({ ...prev, logo: "Channel logo is required" }));
      return;
    }

    try {
      let res;
      if (initialData) {
        res = await updateChannel({
          id: initialData.id,
          data: channelData,
        }).unwrap();
      } else {
        res = await createChannel(channelData).unwrap();
      }

      if (res.success) {
        toast.success(res.message || "Operation successful!");

        setFormData({ name: "", location: "", description: "" });
        setPreview(null);
        setImageFile(null);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[var(--primary)] blur-md shadow-[0_0_20px_var(--primary)]" />

        <div className="p-8 pb-4 flex justify-between items-start text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--primary)] text-black rounded-2xl">
              <Tv size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Setup Channel
              </h2>
              <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} className="text-[var(--primary)]" /> Start
                Broadcasting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors text-[var(--muted-foreground)] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-5 text-white">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--muted-foreground)]">
              Channel Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="e.g. CineMax HD"
              onChange={handleChange}
              className={`w-full bg-[var(--muted)] border ${errors.name ? "border-red-500" : "border-[var(--border)]"} rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all font-bold placeholder:opacity-30`}
            />
            {errors.name && (
              <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--muted-foreground)] flex items-center gap-1.5">
                <MapPin size={12} /> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className={`w-full bg-[var(--muted)] border ${errors.location ? "border-red-500" : "border-[var(--border)]"} rounded-xl px-5 py-3 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all text-sm font-bold placeholder:opacity-30`}
              />
              {errors.location && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--muted-foreground)] flex items-center gap-1.5">
                <ImageIcon size={12} /> Logo
              </label>
              <label
                className={`flex items-center justify-center w-full bg-[var(--muted)] border ${errors.logo ? "border-red-500" : "border-[var(--border)]"} rounded-xl px-5 py-3 cursor-pointer hover:border-[var(--primary)]/50 transition-all`}
              >
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <Upload size={14} />
                  <span className="text-[10px] font-bold uppercase">
                    {preview ? "Change" : "Select"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="image"
                  onChange={handleFileChange}
                />
              </label>
              {errors.logo && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                  {errors.logo}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-[var(--muted-foreground)] flex items-center gap-1.5">
              <AlignLeft size={12} /> Info
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              placeholder="Description..."
              className={`w-full bg-[var(--muted)] border ${errors.description ? "border-red-500" : "border-[var(--border)]"} rounded-2xl px-5 py-3 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all text-sm font-bold resize-none placeholder:opacity-30`}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                {errors.description}
              </p>
            )}
          </div>

          {preview && (
            <div className="relative w-20 h-20 mx-auto group animate-in zoom-in-50">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl border-2 border-[var(--primary)] shadow-lg"
              />
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <button
            disabled={isLoading || isUpdating}
            type="submit"
            className="w-full bg-[var(--primary)] cursor-pointer text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl shadow-[var(--primary)]/20"
          >
            {isLoading || isUpdating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <p>Creating...</p>
              </>
            ) : (
              <>{initialData ? "Update Channel" : "Create Channel"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
