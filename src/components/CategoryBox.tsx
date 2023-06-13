import { useCallback } from "react";
import { CategoryBoxProps } from "@/types";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryBox = ({ icon: Icon, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  // Handle Click
  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Get Search Parameters as Object
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // add category to search parameters object
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // delete category if  already exists in search  parameters
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // create new url
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // push to the url
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 pt-3 border-b-2 hover:text-neutral-800 transition ${
        selected ? "text-neutral-800" : "text-neutral-500"
      }  ${selected ? "border-neutral-800" : "border-transparent"}`}
    >
      <Icon size={28} />
      <h6 className="font-medium text-sm">{label}</h6>
    </div>
  );
};

export default CategoryBox;
