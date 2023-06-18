"use client";

import React from "react";
// Formik
import { Field, ErrorMessage, FieldProps } from "formik";
// Types
import { Category, RadioInputProps } from "@/types";

const RadioInput = ({ name, label, options, ...rest }: RadioInputProps) => {
  return (
    <>
      {" "}
      <Field id={name} name={name} placeholder={label} {...rest}>
        {({ field }: FieldProps) => {
          return options.map(({ label, icon: Icon }: Category) => (
            <React.Fragment key={label}>
              <input
                type="radio"
                {...field}
                id={label}
                value={label}
                checked={field.value == label}
                className="hidden"
                name={name}
              />

              <label
                htmlFor={label}
                className={`flex flex-col gap-3 items-start p-4 transition rounded-xl border-2  hover:border-black ${
                  field.value == label ? "border-black" : "border-neutral-200"
                } `}
                title={label}
              >
                <Icon size={30} />
                <div className=" font-semibold  ">{label}</div>
              </label>
            </React.Fragment>
          ));
        }}
      </Field>
      <ErrorMessage
        name={name}
        className="text-red-500  col-span-full"
        component={"div"}
      />
    </>
  );
};

export default RadioInput;
