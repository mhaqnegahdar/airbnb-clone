import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className=" rounded-full border-[1px] w-full md:w-auto py-2 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <button className="px-6 text-sm font-semibold ">Anywhere</button>
        <button className="px-6 text-sm font-semibold hidden sm:block flex-1 border-x-[1px]">
          Any Week
        </button>
        <div className="flex gap-3 flex-row text-sm text-gray-600 items-center pl-6 pr-2">
          <button className="hidden sm:block">Add Guests</button>
          <div className="rounded-full p-2 bg-rose-500 text-white ">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
