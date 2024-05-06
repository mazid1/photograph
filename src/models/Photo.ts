import { z } from "zod";

export const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  src: z.object({
    original: z.string(),
  }),
  alt: z.string(),
  avg_color: z.string(),
});

export type Photo = z.infer<typeof PhotoSchema>;

export const PageResponseSchema = z.object({
  photos: z.array(PhotoSchema),
  page: z.number(),
  per_page: z.number(),
  total_results: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
});

export type PageResponse = z.infer<typeof PageResponseSchema>;
