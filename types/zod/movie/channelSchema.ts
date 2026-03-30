import z from "zod";

export const channelSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const movieUploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be 10+ characters"),
  genre: z.string().min(1, "Genre is required"),
  director: z.string().min(1, "Director is required"),
  cast: z.string().min(1, "Cast is required (comma separated)"),
  duration: z.string().min(1, "Duration is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  price: z.string().default("0"),
  isPremium: z.boolean().default(false),
});
