"use client";
import { updateProfilePicture } from "@/actions/updateProfilePicture";
import getCroppedImage from "@/lib/getCroppedImage";
import { useCallback, useEffect, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

type ImageCropperProps = {
  file: File;
};

export function ImageCropper({ file }: ImageCropperProps) {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const src = URL.createObjectURL(file);
    setImageSource(src);
    return () => {
      URL.revokeObjectURL(src);
      setImageSource(null);
    };
  }, [file]);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleZoomChange = (event: any) => {
    setZoom(Number(event.target.value));
  };

  const handleCropChange = (crop: any) => {
    setCrop(crop);
  };

  const handleUpload = async () => {
    if (!imageSource) {
      return;
    }
    setIsUploading(true);
    try {
      const croppedImage = await getCroppedImage(
        imageSource,
        croppedAreaPixels
      );
      const fileName = file.name.slice(0, file.name.lastIndexOf(".")) + ".png";
      const type = "image/png";
      const formData = new FormData();
      formData.append("image", croppedImage, fileName);
      const response = await updateProfilePicture({
        formData,
        fileName,
        type,
      });
      if (!response.success) {
        throw new Error(response.message);
      }
      console.log("Upload successful", response.data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const imageCropper = useMemo(() => {
    if (!imageSource) {
      return <div className="skeleton w-full h-full"></div>;
    }

    return (
      <Cropper
        image={imageSource}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        onCropChange={handleCropChange}
        onZoomChange={handleZoomChange}
        onCropComplete={onCropComplete}
      />
    );
  }, [imageSource, crop, zoom]);

  return (
    <div className="max-w-5xl min-w-64">
      <h3 className="font-bold text-lg mb-4">Upload Image</h3>
      <div className="h-96 w-full max-w-lg overflow-hidden relative">
        {imageCropper}
      </div>
      <div className="flex flex-col mt-4 gap-4">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          className="range"
          onChange={handleZoomChange}
        />
        <button onClick={handleUpload} className="btn btn-sm btn-primary">
          Upload
        </button>
      </div>
    </div>
  );
}
