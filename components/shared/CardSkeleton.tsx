import React from "react";

const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-card rounded-2xl overflow-hidden border border-border">
      <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700" />

      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />

        <div className="flex justify-between">
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
};

export default CardSkeleton;
