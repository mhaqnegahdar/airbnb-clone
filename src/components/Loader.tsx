"use client";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <PuffLoader size={100} color="#e03f5f" />
    </div>
  );
};

export default Loader;
