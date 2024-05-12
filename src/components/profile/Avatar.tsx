"use client";
import { getInitials } from "@/lib/getInitials";
import { UserProfile } from "@/models/User";
import { ImageUploadIcon } from "../icons/ImageUploadIcon";
import {
  ChangeEvent,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";

type AvatarProps = {
  user: UserProfile;
};

export function Avatar({ user }: AvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files.item(0);
      if (!file || !file.type.match(/image.*/)) {
        throw new Error("Upload invalid");
      }
      setUploadedFile(file);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFileInputClick = (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="avatar placeholder relative">
      <div className="bg-neutral text-neutral-content rounded-full w-24">
        <span className="text-3xl">{getInitials(user.name)}</span>
      </div>
      <input
        ref={inputRef}
        onChange={handleFileInputChange}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={handleFileInputClick}
        className="bg-neutral text-neutral-content rounded-full w-24 absolute opacity-0 hover:opacity-100 hover:cursor-pointer"
      >
        <ImageUploadIcon className="stroke-neutral-content w-8 h-8" />
      </div>
    </div>
  );
}
