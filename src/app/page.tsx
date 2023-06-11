"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { incrementByAmount, selectCount } from "@/redux/counter/counterSlice";
import { useState } from "react";
import { selectIsOpen } from "@/redux/modal/registerModalSlice";

export default function Home() {
  const value = useAppSelector(selectCount);
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();
  const [number, setNumber] = useState(1);

  return (
    <div className="pt-24">
      <h1>{value}</h1>
      <h1>IsOpen: {isOpen && "Open"}</h1>

      <label htmlFor="number">Increment Number</label>
      <input
        min={1}
        type="number"
        id="number"
        value={number}
        onChange={(e) => setNumber(e.target.valueAsNumber)}
      />
      <button onClick={() => dispatch(incrementByAmount(number))}>
        Increment
      </button>
    </div>
  );
}
