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
  data: T;
}
