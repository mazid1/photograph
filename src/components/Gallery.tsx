"use client";
import { fetchPhotos } from "@/lib/fetchPhotos";
import { PageResponse } from "@/models/Photo";
import { useCallback, useEffect, useState } from "react";

type GalleryProps = {
  query: string;
};

function Gallery({ query }: GalleryProps) {
  const [photoPage, setPhotoPage] = useState<PageResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const loadPhotos = useCallback(
    async (url?: string | URL) => {
      setIsLoading(true);
      const responsePage = await fetchPhotos(url ? { url } : { query });
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
    },
    [query]
  );

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  if (!photoPage && !isLoading) {
    return <section className="px-2 my-3">No photos found</section>;
  }

  return (
    <section>
      <div className="px-2 my-3 grid grid-cols-gallery gap-6 place-content-center place-items-center">
        {photoPage?.photos.map((photo) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={photo.id}
            src={`/.netlify/images?url=${photo.src.original}&fit=cover&position=center&w=250`}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="rounded-lg object-cover "
          />
        ))}
      </div>
      <div className="w-100 flex">
        <button
          onClick={() => loadPhotos(photoPage?.next_page)}
          disabled={isLoading}
          className="btn btn-primary mx-auto"
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          {isLoading ? "Loading..." : "Load more"}
        </button>
      </div>
    </section>
  );
}

export default Gallery;
