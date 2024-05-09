"use server";
import { PageResponseSchema } from "@/models/Photo";
import { env } from "../lib/env";

type FetchPhotosParams = {
  query?: string;
  url?: string | URL;
};

export const fetchPhotos = async ({ query, url }: FetchPhotosParams) => {
  if (!url) {
    if (query) {
      url = new URL(
        `https://api.pexels.com/v1/search?per_page=40&query=${query}`
      );
    } else {
      url = new URL(`https://api.pexels.com/v1/curated?per_page=40`);
    }
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
