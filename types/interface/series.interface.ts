export interface ISeason {
  id: string;
  seasonNumber: number;
  title?: string | null;
  posterUrl?: string | null;
  posterUrlPublicId?: string | null;
  seriesId: string;
  episodes?: any[];
  createdAt: string | Date;
}

export interface ISeries {
  id: string;
  userId: string;
  title: string;
  description: string;
  director: string;
  cast: string[];
  genre: string;
  releaseDate: string | Date;
  price: number;
  isPremium: boolean;
  posterUrl?: string;
  posterPublicId?: string;
  trailerUrl?: string;
  trailerUrlPublicId?: string;
  createdAt: string;
  updatedAt: string;
  seasons?: ISeason[];
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number;
}
