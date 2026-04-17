"use client";

import React, { useState } from "react";

import { Loader2 } from "lucide-react";
import { useMyReviewsQuery } from "@/redux/api/review.api";

export default function Comments() {
  const [activeTab, setActiveTab] = useState<
    "APPROVED" | "PENDING" | "REJECTED"
  >("APPROVED");

  const { data: reviewsRes, isLoading } = useMyReviewsQuery({});

  const allReviews = reviewsRes?.data || [];

  const filteredReviews = allReviews.filter((r: any) => r.status === activeTab);

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-6">
        {["APPROVED", "PENDING", "REJECTED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded border font-bold ${
              activeTab === tab
                ? tab === "APPROVED"
                  ? "bg-green-500 text-white"
                  : tab === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-red-500 text-white"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-black text-left text-sm">
              <tr>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Review</th>
                <th className="p-3 border">Rating</th>
                <th className="p-3 border">Tags</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-400">
                    No {activeTab} reviews
                  </td>
                </tr>
              )}

              {filteredReviews.map((review: any) => {
                const isMovie = !!review.media;
                const title =
                  review.media?.title || review.series?.title || "No Title";

                return (
                  <tr key={review.id} className="text-sm">
                    <td className="p-3 border">
                      {isMovie ? (
                        <span className="text-green-600 font-bold text-xs">
                          🎬 Movie
                        </span>
                      ) : (
                        <span className="text-blue-600 font-bold text-xs">
                          📺 Series
                        </span>
                      )}
                    </td>
                    <td className="p-3 border">{title}</td>
                    <td className="p-3 border max-w-[300px] whitespace-pre-line break-words">
                      {review.content || "No content"}
                    </td>
                    <td className="p-3 border">⭐ {review.rating ?? 0}</td>
                    <td className="p-3 border max-w-[200px]">
                      {review.tags?.length > 0 ? (
                        <div className="flex flex-wrap gap-1 break-words">
                          {review.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-gray-100 text-black px-2 py-1 rounded break-words"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No tags</span>
                      )}
                    </td>
                    <td className="p-3 border">{review?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
