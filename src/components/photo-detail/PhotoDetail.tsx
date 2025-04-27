"use client";
import { cn } from "@/lib/utils";
import type { Photo } from "@/models/Photo";
import React, { useState } from "react";
import LikeButton from "./LikeButton";
import PhotoDownloader from "./PhotoDownloader";

type PhotoDetailProps = {
	photo: Photo;
};

function PhotoDetail({ photo }: PhotoDetailProps) {
	const src = `/.netlify/images?url=${photo.src.original}&fit=contain&position=center`;
	const [isFit, setIsFit] = useState(false);

	return (
		<div className="max-w-4xl flex flex-col">
			<div className="flex flex-col items-center">
				<h3 className="font-bold text-lg mb-2">{photo.alt}</h3>
				<div className="flex flex-row flex-wrap items-center mb-2 gap-2">
					<LikeButton photo={photo} />
					<PhotoDownloader photo={photo} />
					<div className="form-control">
						<label className="cursor-pointer label gap-1">
							<span className="label-text">Fit</span>
							<input
								type="checkbox"
								className="toggle toggle-primary"
								checked={isFit}
								onChange={(e) => setIsFit(e.currentTarget.checked)}
							/>
						</label>
					</div>
				</div>
			</div>
			<div
				className={cn("overflow-auto max-h-full", {
					flex: isFit,
					"justify-center": isFit,
				})}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={src}
					srcSet={`${src}&w=250 250w, ${src}&w=420 420w, ${src}&w=768 768w`}
					sizes={"(max-width: 336px) 250px, (max-width: 640px) 420px, 768px"}
					alt={photo.alt}
					width={photo.width}
					height={photo.height}
					className={cn("object-cover object-center rounded", {
						"object-contain": isFit,
						"max-h-full": isFit,
						"w-auto": isFit,
					})}
					style={{ backgroundColor: photo.avg_color }}
				/>
			</div>
		</div>
	);
}

export default PhotoDetail;
