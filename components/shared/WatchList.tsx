"use client";

import { Button } from "../ui/button";
import { PlayCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useWatchListMutation } from "@/redux/api/user.api";

interface WatchList {
  itemId: string;
  type: "MOVIE" | "SERIES";
  refetch: () => void;
}

const WatchList = ({ itemId, type, refetch }: WatchList) => {
  const [watchList, { isLoading }] = useWatchListMutation();

  const handleWatchButton = async () => {
    const payload = {
      [type === "MOVIE" ? "mediaId" : "seriesId"]: itemId,
    };
    try {
      const result = await watchList(payload).unwrap();
      toast.success(result?.message);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Button
      onClick={handleWatchButton}
      disabled={isLoading}
      className="w-full h-9 px-2 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-all bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
    >
      <span className="whitespace-nowrap">Watch Later</span>
    </Button>
  );
};

export default WatchList;
