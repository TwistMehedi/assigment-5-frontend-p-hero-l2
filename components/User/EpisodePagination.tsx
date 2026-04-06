import React, { useState } from "react";
import { Play, Clapperboard, ChevronLeft, ChevronRight } from "lucide-react";

interface EpisodePaginationProps {
  episodes: any[];
  setActiveVideo: (url: string) => void;
}

const EpisodePagination = ({
  episodes,
  setActiveVideo,
}: EpisodePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(episodes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEpisodes = episodes.slice(startIndex, startIndex + itemsPerPage);

  if (episodes.length === 0)
    return (
      <p className="text-center py-4 text-[10px] uppercase opacity-50">
        No episodes available
      </p>
    );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
        {currentEpisodes.map((ep: any) => (
          <div
            key={ep.id}
            onClick={() => setActiveVideo(ep.videoUrl)}
            className="flex items-center justify-between p-2 hover:bg-muted rounded-lg transition-all group cursor-pointer border border-transparent hover:border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-muted rounded group-hover:bg-primary transition-all">
                <Play
                  size={10}
                  className="text-muted-foreground group-hover:text-black fill-current"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase italic group-hover:text-primary transition-colors">
                  {ep.episodeNumber}. {ep.title}
                </span>
              </div>
            </div>
            <Clapperboard size={12} className="text-muted-foreground/30" />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pb-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-1 disabled:opacity-20 hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[9px] font-black tracking-widest">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-1 disabled:opacity-20 hover:text-primary transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodePagination;
