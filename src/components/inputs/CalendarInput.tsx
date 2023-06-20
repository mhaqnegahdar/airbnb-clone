"use client";
//Hooks/Packages
import { DateRange } from "react-date-range";

//Types
import { CalendarInputProps } from "@/types";

//Styles
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalendarInput = ({
  value,
  onChange,
  disabledDates,
}: CalendarInputProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default CalendarInput;
