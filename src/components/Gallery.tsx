import { getCuratedPhotos } from "@/lib/getCuratedPhotos";

async function Gallery() {
  const photoPage = await getCuratedPhotos();

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
