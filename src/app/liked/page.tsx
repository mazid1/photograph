import { getLikedPhotos } from "@/actions/getLikedPhotos";
import Gallery from "@/components/Gallery";
import { PageResponse } from "@/models/Photo";
import { ErrorType } from "@/models/ResponseType";
import { redirect } from "next/navigation";
import React from "react";

async function LikedPage() {
  const likedPhotos = await getLikedPhotos();

  if (
    likedPhotos.success === false &&
    likedPhotos.errorType === ErrorType.UNAUTHORIZED
  ) {
    return redirect("/login");
  }

  const photos = Object.values(likedPhotos.data!);
  const pageResponse: PageResponse = {
    photos,
    page: 1,
    per_page: photos.length,
    total_results: photos.length,
  };

  return <Gallery initialPage={pageResponse} />;
}

export default LikedPage;
