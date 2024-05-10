"use client";
import { fetchPhotos } from "@/actions/fetchPhotos";
import { PageResponse } from "@/models/Photo";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PhotoCard from "./photo-card/PhotoCard";
import { ModalContextProvider } from "@/context/ModalContext";
import { useLikeStore } from "@/store/likeStoreProvider";

type GalleryProps = {
  initialPage: PageResponse | undefined;
  likedOnly?: boolean;
};

function Gallery({ initialPage, likedOnly }: GalleryProps) {
  const [photoPage, setPhotoPage] = useState<PageResponse | undefined>(
    initialPage
  );
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const liked = useLikeStore((state) => state.liked);

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
      <ModalContextProvider>
        <div className="px-2 my-2 grid grid-cols-gallery auto-rows-[10px] gap-x-3 place-content-center place-items-center">
          {likedOnly
            ? Object.values(liked).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))
            : photoPage?.photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
        </div>
        {photoPage?.next_page && (
          <div ref={ref} className="w-full text-center mb-3">
            Loading...
          </div>
        )}
      </ModalContextProvider>
    </section>
  );
}

export default Gallery;
