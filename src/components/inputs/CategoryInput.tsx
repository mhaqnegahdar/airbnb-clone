"useClient";

// Types
import { CategoryInputProps } from "@/types";

const CategoryInput = ({
  label,
  icon: Icon,
  onClick,
  selected,
}: CategoryInputProps) => {
  return (
    <button
      className={`flex flex-col gap-3 items-start p-4 transition rounded-xl border-2  hover:border-black ${
        selected ? "border-black" : "border-neutral-200"
      } `}
      title={label}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className=" font-semibold  ">{label}</div>
    </button>
  );
};

export default CategoryInput;
