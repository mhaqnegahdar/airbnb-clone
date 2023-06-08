import { MenuItemProps } from "@/types";
const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <li
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default MenuItem;
