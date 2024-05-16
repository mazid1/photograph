"use client";
import React from "react";
import HeartIcon from "../icons/HeartIcon";
import { cn } from "@/lib/utils";
import { Photo } from "@/models/Photo";
import { useLikeStore } from "@/context/LikeStoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/actions/toggleLike";
import { useModal } from "@/context/ModalContext";

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
