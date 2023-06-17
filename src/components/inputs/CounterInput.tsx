"use client";

import React from "react";
// Formik
import { Field, ErrorMessage, FieldProps } from "formik";
// Types
import { CounterInputProps } from "@/types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CounterInput = ({
  name,
  title,
  subtitle,
  ...rest
}: CounterInputProps) => {
  return (
    <>
      {" "}
      <div className="flex flex-row items-center justify-between">
        {/* Title */}
        <div className="flex flex-col">
          <div className="font-medium">{title}</div>
          <div className="font-light text-gray-600">{subtitle}</div>
        </div>
        {/* Input */}

        <Field id={name} name={name} type="number" {...rest}>
          {({ field, meta, form }: FieldProps) => {
            console.log(field, meta, form);
            return (
              <div className="flex flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    field.value > 1 && form.setFieldValue(name, field.value - 1)
                  }
                  className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                  <AiOutlineMinus />
                </button>
                <input
                  className="font-light text-xl text-neutral-600 w-6 text-center outline-none appearance-none "
                  {...field}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => form.setFieldValue(name, field.value + 1)}
                  className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            );
          }}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        className="text-red-500 text-xs italic start-0 col-span-full"
        component={"div"}
      />
    </>
  );
};

export default CounterInput;
