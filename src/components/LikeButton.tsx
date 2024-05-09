import React from "react";
import HeartIcon from "./icons/HeartIcon";
import { cn } from "@/lib/utils";

type LikeButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLiked?: boolean;
};

function LikeButton({ isLiked = false, className, ...rest }: LikeButtonProps) {
  return (
    <button className={cn("btn btn-primary", className)} {...rest}>
      <HeartIcon
        className={isLiked ? "fill-rose-500 dark:fill-rose-600" : ""}
      />
      {isLiked ? "Liked" : "Like"}
    </button>
  );
}

export default LikeButton;
