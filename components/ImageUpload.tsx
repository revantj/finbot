"use client";

import React, { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Icons } from "./Icons";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <h1 className="pb-1 text-sm font-medium">
        Image <span className="text-red-600">*</span>
      </h1>
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="m0biuf1h"
      >
        {!value ? (
          <div className="rounded-md border p-8">
            <Icons.image className="size-8" />
          </div>
        ) : (
          <div className="rounded-md border-2 border-green-400 p-1.5">
            <Image
              src={value}
              alt="upload"
              width={1280}
              height={1480}
              className="size-60 rounded-md object-cover object-center"
            />
          </div>
        )}
      </CldUploadButton>
    </>
  );
};

export default ImageUpload;
