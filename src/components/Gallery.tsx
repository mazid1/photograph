"use client";
import { fetchPhotos } from "@/lib/fetchPhotos";
import { PageResponse } from "@/models/Photo";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PhotoContainer from "./PhotoContainer";

type GalleryProps = {
  initialPage: PageResponse | undefined;
};

function Gallery({ initialPage }: GalleryProps) {
  const [photoPage, setPhotoPage] = useState<PageResponse | undefined>(
    initialPage
  );
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMore = async (url: string | URL) => {
    setIsLoading(true);
    const responsePage = await fetchPhotos({ url });
    setPhotoPage((prev) => {
      if (!prev) {
        return responsePage;
      }
      if (!responsePage) {
        return prev;
      }
      return {
        ...responsePage,
        photos: [...prev.photos, ...responsePage.photos],
      };
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (inView && photoPage?.next_page) {
      loadMore(photoPage.next_page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!photoPage && !isLoading) {
    return <section className="px-2 my-3">No photos found</section>;
  }

  return (
    <section>
      <div className="px-2 my-3 grid grid-cols-gallery auto-rows-[10px] place-content-center place-items-center">
        {photoPage?.photos.map((photo) => (
          <PhotoContainer key={photo.id} photo={photo} />
        ))}
      </div>
      <div ref={ref} className="w-full text-center mb-3">
        Loading...
      </div>
    </section>
  );
}

export default Gallery;
