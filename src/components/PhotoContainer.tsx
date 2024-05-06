import { Photo } from "@/models/Photo";

type PhotoContainerProps = {
  photo: Photo;
};

function PhotoContainer({ photo }: PhotoContainerProps) {
  const heightWidthRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * heightWidthRatio);
  const rowSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div
      className="w-[250px] overflow-hidden rounded-lg"
      style={{ gridRow: `span ${rowSpans}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/.netlify/images?url=${photo.src.original}&fit=cover&position=center&w=250`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
      />
    </div>
  );
}

export default PhotoContainer;
