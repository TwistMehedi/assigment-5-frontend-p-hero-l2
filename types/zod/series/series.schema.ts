import { z } from "zod";

export const seriesSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description should be more descriptive"),
  director: z.string().min(2, "Director name is required"),
  genre: z.string().min(2, "Genre is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number",
  }),
  cast: z.string().min(2, "Please add at least one cast member"),
  isPremium: z.string(),
});
