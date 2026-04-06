import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LibraryPaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const LibraryPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: LibraryPaginationProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 pt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-black uppercase hover:border-primary disabled:opacity-30 transition-all"
      >
        <ChevronLeft size={14} /> Prev
      </button>

      <div className="flex gap-1">
        {[...Array(totalPage)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${
              currentPage === idx + 1
                ? "bg-primary text-black border-primary"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-[10px] font-black uppercase hover:border-primary disabled:opacity-30 transition-all"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default LibraryPagination;
