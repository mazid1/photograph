"use client";
import React, { MouseEvent } from "react";
import HeartIcon from "../icons/HeartIcon";
import { Photo } from "@/models/Photo";
import { useLikeStore } from "@/context/LikeStoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/actions/toggleLike";
import { cn } from "@/lib/utils";

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
      className={cn("btn btn-circle btn-outline", className)}
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
