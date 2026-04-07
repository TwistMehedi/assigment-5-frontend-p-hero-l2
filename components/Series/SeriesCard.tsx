
import Link from "next/link";
import { Star, Tv } from "lucide-react";

interface SeriesProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  averageRating?: number;
  seasons: number;
  category: string;
  status?: string;
  posterUrl?: string;
}

const SeriesCard = ({
  id,
  title,
  image,
  rating,
  seasons,
  averageRating,
  category,
  status,
  posterUrl,
}: SeriesProps) => {
  return (
    <Link href={`/series/${id}`}>
      <div className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-bold text-white">
              {averageRating}/10
            </span>
          </div>
        </div>

        <div className="p-4 space-y-1">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {category}
          </p>
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Tv size={12} />
              <span className="text-[10px] font-medium">TV Series</span>
            </div>
            {status && (
              <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                {status}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;
