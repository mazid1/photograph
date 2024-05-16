import { Photo } from "@/models/Photo";
import React from "react";
import PhotoDownloader from "./PhotoDownloader";
import LikeButton from "./LikeButton";

type PhotoDetailProps = {
  photo: Photo;
};

function PhotoDetail({ photo }: PhotoDetailProps) {
  const src = `/.netlify/images?url=${photo.src.original}&fit=cover&position=center`;

  return (
    <div className="max-w-4xl flex flex-col">
      <div className="flex flex-col items-center">
        <h3 className="font-bold text-lg mb-2">{photo.alt}</h3>
        <div className="flex flex-row flex-wrap mb-2 gap-2">
          <LikeButton photo={photo} />
          <PhotoDownloader photo={photo} />
        </div>
      </div>
      <div className="overflow-auto max-h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={`${src}&w=250 250w, ${src}&w=420 420w, ${src}&w=768 768w`}
          sizes={"(max-width: 336px) 250px, (max-width: 640px) 420px, 768px"}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="object-cover object-center rounded"
          style={{ backgroundColor: photo.avg_color }}
        />
      </div>
    </div>
  );
}

export default PhotoDetail;
