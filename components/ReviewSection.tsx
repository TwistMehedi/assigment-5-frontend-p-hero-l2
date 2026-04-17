"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Send,
  Loader2,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingSystem from "@/components/movie/RatingSystem";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "@/redux/api/review.api";

interface ReviewSectionProps {
  itemId: string;
  type: "MOVIE" | "SERIES";
  refetch: () => void;
}

const ReviewSection = ({ itemId, type, refetch }: ReviewSectionProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(5);

  const { data: reviewsRes, isLoading: isReviewsLoading } = useGetReviewsQuery({
    id: itemId,
    type,
  });

  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const TAG_OPTIONS = [
    "spoiler",
    "family-friendly",
    "classic",
    "18+",
    "underrated",
    "must-watch",
    "boring",
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a rating!");
    if (!content.trim()) return toast.error("Please write something!");

    try {
      const payload: any = {
        rating,
        content,
        tags: selectedTags,
        [type === "MOVIE" ? "mediaId" : "seriesId"]: itemId,
      };

      await createReview(payload).unwrap();
      toast.success("Review submitted!");
      setContent("");
      setRating(0);
      setSelectedTags([]);
      setVisibleCount(5);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post review");
    }
  };

  // const allReviews = reviewsRes?.data || [];

  const allReviews =
    reviewsRes?.data?.filter((review: any) => review.status === "APPROVED") ||
    [];

  const filteredReviews = activeTag
    ? allReviews.filter((review: any) => review.tags?.includes(activeTag))
    : allReviews;

  const displayedReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = filteredReviews.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="space-y-10 mt-12">
      <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-6">
        <div className="flex items-center gap-2 font-black text-2xl italic uppercase tracking-tighter">
          <MessageSquare className="text-primary h-7 w-7" /> Rate & Review
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-muted-foreground">
            Your Rating
          </p>
          <RatingSystem onRate={(val) => setRating(val)} />
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 p-4 bg-background border border-border rounded-2xl outline-none focus:border-primary transition-colors text-sm"
          placeholder="Share your thoughts..."
        />

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-muted-foreground">
            Select Tags
          </p>

          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition 
          ${
            selectedTags.includes(tag)
              ? "bg-primary text-black border-primary"
              : "bg-background text-muted-foreground border-border hover:border-primary"
          }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="font-black cursor-pointer bg-primary text-black hover:bg-white uppercase tracking-widest h-12 px-8 rounded-xl gap-2"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
          Submit Review
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 text-xs rounded-full border font-bold ${
            activeTag === null
              ? "bg-primary text-black"
              : "border-border text-muted-foreground"
          }`}
        >
          All
        </button>

        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 text-xs rounded-full border font-bold ${
              activeTag === tag
                ? "bg-primary text-black"
                : "border-border text-muted-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black uppercase italic border-l-4 border-primary pl-4">
          User Reviews ({filteredReviews.length})
        </h3>

        {isReviewsLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid gap-4">
            {displayedReviews.map((review: any) => (
              <div
                key={review.id}
                className="bg-card/50 p-5 rounded-2xl border border-border flex gap-4 animate-in fade-in duration-500"
              >
                <img
                  src={review.user?.image || "/default-avatar.png"}
                  className="w-12 h-12 rounded-full object-cover border border-primary/20"
                  alt="user"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm uppercase">
                        {review.user?.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        {format(new Date(review.createdAt), "dd MMM yyyy")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-[10px] font-bold">
                        <Star size={10} className="fill-current" />
                        {review.rating}.0
                      </div>

                      {review.status === "APPROVED" && (
                        <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold">
                          <Check size={10} />
                          Approved
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {review.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {allReviews.length === 0 && (
              <p className="text-center text-muted-foreground py-10 italic">
                No reviews yet.
              </p>
            )}

            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="gap-2 font-bold uppercase text-xs tracking-widest border-primary text-primary hover:bg-primary hover:text-black rounded-xl px-6"
                >
                  Load More ({allReviews.length - visibleCount} Left){" "}
                  <ChevronDown size={16} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
