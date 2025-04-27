import { useModal } from "@/context/ModalContext";
import type { Photo } from "@/models/Photo";
import PhotoDetail from "../photo-detail/PhotoDetail";
import LikeButtonRounded from "./LikeButtonRounded";

type PhotoContainerProps = {
	photo: Photo;
};

function PhotoCard({ photo }: PhotoContainerProps) {
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
				className="w-[250px] overflow-hidden rounded-lg hover:cursor-pointer hover:opacity-90 relative"
				style={{ gridRow: `span ${rowSpans}` }}
				onClick={handleClick}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={`/.netlify/images?url=${photo.src.original}&fit=contain&position=center&w=250`}
					alt={photo.alt}
					width={photo.width}
					height={photo.height}
					className="w-full h-full object-contain object-center"
					style={{ backgroundColor: photo.avg_color }}
				/>
				<LikeButtonRounded photo={photo} className="absolute top-2 right-2" />
			</div>
		</>
	);
}

export default PhotoCard;
