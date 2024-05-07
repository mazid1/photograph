import { Photo } from "@/models/Photo";
import React from "react";

type PhotoDetailProps = {
  photo: Photo;
};

function PhotoDetail({ photo }: PhotoDetailProps) {
  const src = `/.netlify/images?url=${photo.src.original}&fit=cover&position=center`;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      srcSet={`${src}&w=250 250w, ${src}&w=420 420w, ${src}&w=768 768w`}
      sizes={"(max-width: 336px) 250px, (max-width: 640px) 420px, 768px"}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      className="w-full h-full object-cover object-center"
      style={{ backgroundColor: photo.avg_color }}
    />
  );
}

export default PhotoDetail;
