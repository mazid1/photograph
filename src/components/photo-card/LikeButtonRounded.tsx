"use client";
import { toggleLike } from "@/actions/toggleLike";
import { useLikeStore } from "@/context/LikeStoreProvider";
import { cn } from "@/lib/utils";
import type { Photo } from "@/models/Photo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import type { MouseEvent } from "react";
import HeartIcon from "../icons/HeartIcon";

type LikeButtonRoundedProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	photo: Photo;
};

function LikeButtonRounded({
	photo,
	className,
	...rest
}: LikeButtonRoundedProps) {
	const { liked, toggle } = useLikeStore((state) => state);
	const { data: session } = useSession();
	const router = useRouter();

	const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!session) {
			return router.push("/login");
		}
		await toggleLike(photo);
		toggle(photo);
	};

	return (
		<button
			className={cn("btn btn-circle glass btn-outline", className)}
			{...rest}
			onClick={handleClick}
		>
			<HeartIcon
				className={liked[photo.id] ? "fill-rose-500 dark:fill-rose-600" : ""}
			/>
		</button>
	);
}

export default LikeButtonRounded;
