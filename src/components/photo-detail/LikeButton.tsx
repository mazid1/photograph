"use client";
import { toggleLike } from "@/actions/toggleLike";
import { useLikeStore } from "@/context/LikeStoreProvider";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/lib/utils";
import type { Photo } from "@/models/Photo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import HeartIcon from "../icons/HeartIcon";

type LikeButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	photo: Photo;
};

function LikeButton({ photo, className, ...rest }: LikeButtonProps) {
	const { liked, toggle } = useLikeStore((state) => state);
	const { data: session } = useSession();
	const router = useRouter();
	const { closeModal } = useModal();

	const handleClick = async () => {
		if (!session) {
			closeModal();
			return router.push("/login");
		}
		await toggleLike(photo);
		toggle(photo);
	};

	return (
		<button
			className={cn("btn btn-sm btn-primary", className)}
			{...rest}
			onClick={handleClick}
		>
			<HeartIcon
				className={liked[photo.id] ? "fill-rose-500 dark:fill-rose-600" : ""}
			/>
			{liked[photo.id] ? "Liked" : "Like"}
		</button>
	);
}

export default LikeButton;
