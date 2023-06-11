"use client";

import { InputProps } from "@/types";
import { BiDollar } from "react-icons/bi";
import { Field, ErrorMessage } from "formik";

const Input = ({
  name,
  label,
  type,
  disabled,
  formatPrice,
  error,
}: InputProps) => {
  return (
    <div className="w-full relative mb-4">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <Field
        name={name}
        disabled={disabled}
        placeholder=" "
        type={type ? type : "text"}
        className={`peer w-full border-2 p-4 pt-6 font-light bg-white rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${error ? "border-rose-500" : "border-neutral-300"}  ${
          error ? "focus:border-rose-500" : "focus:border-black"
        } `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 ${
          formatPrice ? "left-9" : "left-4"
        }  ${
          error ? "text-rose-500" : "text-zinc-400"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 origin-[0] z-50`}
      >
        {label}
      </label>
      <ErrorMessage name={name} component={"p"} className="text-rose-500" />
    </div>
  );
};

export default Input;
