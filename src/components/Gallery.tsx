import { fetchPhotos } from "@/lib/fetchPhotos";

type GalleryProps = {
  query: string;
  page: number;
};

async function Gallery(props: GalleryProps) {
  const photoPage = await fetchPhotos(props);

  if (!photoPage) {
    return <section className="px-2 my-3">No photos found</section>;
  }

  return (
    <section className="px-2 my-3 grid grid-cols-gallery gap-6 place-content-center place-items-center">
      {photoPage.photos.map((photo) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={photo.id}
          src={photo.src.original}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="rounded-lg object-cover "
        />
      ))}
    </section>
  );
}

export default Gallery;
