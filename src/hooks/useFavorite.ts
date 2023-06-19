//Libraries
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

//Types
import { UseFavoriteParams } from "@/types";

// Redux
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/modal/loginModalSlice";

const useFavorite = ({ listingId, currentUser }: UseFavoriteParams) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  //Check if listing is favorited
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  //Toggle favorites
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      //open LoginModal if user was logged out
      if (!currentUser) return dispatch(onOpen());

      try {
        const api = `/api/favorites/${listingId}`;
        let request;
        let message = "";

        //Send request based on the favorite state
        if (hasFavorited) {
          request = () => axios.delete(api);
          message = "Removed from favorites";
        } else {
          request = () => axios.post(api);
          message = "Added to favorites";
        }
        await request();
        router.refresh();
        toast.success(message);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, router, dispatch]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
