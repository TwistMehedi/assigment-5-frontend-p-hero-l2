export interface ICategory {
  id: string;
  name: string;
  movieCount?: number;
  slug?: string;
  createdAt?: string;
}

export interface IChannel {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  totalMovie?: string;
  totalSeries?: string;
  slug?: string;
  createdAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}

export interface IMoviePayload {
  title: string;
  description: string;
  genre: string;
  director: string;
  cast: string[] | string;
  duration: number | string;
  releaseDate: string;
  price: number | string;
  isPremium: boolean | string;

  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  posterUrl?: string;
  posterPublicId?: string;
  videoUrl?: string;
  videoUrlPublicId?: string;
  trailerUrl?: string;
  trailerUrlPublicId?: string;

  userId?: string;
}

export interface IMovieResponse {
  id: string;
  title: string;
  description: string;
  genre: string;
  director: string;
  cast: string[];
  duration: number;
  releaseDate: Date;
  price: number;
  isPremium: boolean;
  thumbnailUrl: string;
  posterUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApiMovieResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}
