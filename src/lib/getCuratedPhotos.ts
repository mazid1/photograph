import { PageResponseSchema } from "@/models/Photo";
import { env } from "./env";

// Get curated photos from Pexels API
export const getCuratedPhotos = async (page: number = 1) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}`,
      {
        headers: {
          Authorization: env.PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    const photoPage = PageResponseSchema.parse(data);
    console.log(photoPage);
    return photoPage;
  } catch (error) {
    console.error(error);
  }
};
