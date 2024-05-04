import { PageResponseSchema } from "@/models/Photo";
import { env } from "./env";

type FetchPhotosParams = {
  query?: string;
  page?: number;
};

export const fetchPhotos = async ({ query, page = 1 }: FetchPhotosParams) => {
  let url: URL;
  if (query) {
    url = new URL(
      `https://api.pexels.com/v1/search?query=${query}&page=${page}`
    );
  } else {
    url = new URL(`https://api.pexels.com/v1/curated?page=${page}`);
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    const parsedData = PageResponseSchema.parse(data);

    if (parsedData.total_results === 0) {
      return undefined;
    }

    return parsedData;
  } catch (error) {
    console.error(error);
  }
};
