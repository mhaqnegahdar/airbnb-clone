"use client";

// Types
import { ListingReservationProps } from "@/types";
import CalendarInput from "../inputs/CalendarInput";
import Button from "../Button";

const ListingReservation = ({
  dateRange,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row gap-1 items-center p-4">
        <p className="text-2xl font-semibold ">$ {price}</p>
        <p className="text-neutral-600 font-light "> /night</p>
      </div>
      <hr />
      <CalendarInput
        value={dateRange}
        disabledDates={disabledDates}
        onChange={value => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          label="Submit"
          btnType="button"
          onClick={onSubmit}
          disabled={disabled}
        />
      </div>
      <hr />
      <div className="flex flex-row items-center justify-between p-4">
        <p>Total:</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
