"use client";

//https://stackoverflow.com/questions/67252240/formik-target-is-undefined-when-passing-material-ui-date-picker-as-prop-to-reac

import Select from "react-select";
import dynamic from "next/dynamic";

import { ErrorMessage, Field, FieldProps, useFormikContext } from "formik";

import useCountries from "@/hooks/useCountries";

import { SelectCountryProps } from "@/types";
import { useMemo } from "react";

const SelectCountry = ({ name }: SelectCountryProps) => {
  const { getAll } = useCountries();
  const { setFieldValue, getFieldProps } = useFormikContext();

  // dynamically get Map when Select value changes
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [getFieldProps(name).value]
  );
  return (
    <div className="w-full relative mb-4">
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <>
              <Select
                placeholder="anyWhere"
                isClearable
                options={getAll()}
                {...field}
                value={field.value}
                onChange={(value) => setFieldValue(field.name, value)}
                formatOptionLabel={(option: any) => (
                  <div className="flex flex-row items-center gap-3">
                    <div>{option.flag}</div>
                    <div>
                      {option.label},{" "}
                      <span className="text-neutral-500 ml-1">
                        {option.region}
                      </span>
                    </div>
                  </div>
                )}
                classNames={{
                  control: () => "p-3 border-2",
                  input: () => "text-lg",
                  option: () => "text-lg",
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 6,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                    primary25: "#ffe4e6",
                  },
                })}
              />
              <Map center={field?.value?.latlang || [51, -0.09]} />
            </>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={"p"} className="text-rose-500" />
    </div>
  );
};

export default SelectCountry;
