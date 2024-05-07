import { Photo } from "@/models/Photo";
import { useModal } from "@/context/ModalContext";
import PhotoDetail from "./PhotoDetail";

type PhotoContainerProps = {
  photo: Photo;
};

function PhotoContainer({ photo }: PhotoContainerProps) {
  const heightWidthRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * heightWidthRatio);
  const rowSpans = Math.ceil(galleryHeight / 10) + 1;
  const { showModal, setModalContent } = useModal();

  const handleClick = () => {
    setModalContent(<PhotoDetail photo={photo} />);
    showModal();
  };

  return (
    <>
      <div
        className="w-[250px] overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-90"
        style={{ gridRow: `span ${rowSpans}` }}
        onClick={handleClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/.netlify/images?url=${photo.src.original}&fit=cover&position=center&w=250`}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-full object-cover object-center"
          style={{ backgroundColor: photo.avg_color }}
        />
      </div>
    </>
  );
}

export default PhotoContainer;
