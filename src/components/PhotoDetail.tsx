import { Photo } from "@/models/Photo";
import React from "react";
import PhotoDownloader from "./PhotoDownloader";

type PhotoDetailProps = {
  photo: Photo;
};

function PhotoDetail({ photo }: PhotoDetailProps) {
  const src = `/.netlify/images?url=${photo.src.original}&fit=cover&position=center`;

  return (
    <div className="max-w-5xl min-w-64">
      <h3 className="font-bold text-lg mb-2">{photo.alt}</h3>
      <div className="flex flex-col mb-2">
        <PhotoDownloader photo={photo} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={`${src}&w=250 250w, ${src}&w=420 420w, ${src}&w=768 768w`}
        sizes={"(max-width: 336px) 250px, (max-width: 640px) 420px, 768px"}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="object-cover object-center"
        style={{ backgroundColor: photo.avg_color }}
      />
    </div>
  );
}

export default PhotoDetail;
