"use client";

import React, { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
// Formik
import { Field, ErrorMessage, FieldProps, useFormikContext } from "formik";
// Types
import { UploadImageInputProps } from "@/types";

declare global {
  var cloudinary: any;
}

const UploadImageInput = ({ name, ...rest }: UploadImageInputProps) => {
  const { setFieldValue, getFieldProps } = useFormikContext();

  const handleUpload = useCallback(
    (result: any) => {
      setFieldValue(name, result.info.secure_url);
    },
    [setFieldValue]
  );

  return (
    <>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="m30va8ac"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open && open?.()}
              className="w-full relative hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
              {getFieldProps(name).value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="Upload"
                    fill
                    style={{ objectFit: "cover" }}
                    src={getFieldProps(name).value}
                  />
                </div>
              )}
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Input */}

      <Field id={name} name={name} {...rest} className="hidden" />
      <ErrorMessage name={name} className="text-red-500" component={"div"} />
    </>
  );
};

export default UploadImageInput;
