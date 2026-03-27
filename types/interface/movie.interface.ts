export interface ICategory {
  id: string;
  name: string;
  movieCount?: number;
  slug?: string;
  createdAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
