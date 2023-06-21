"use client";

//Hooks/Packages
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

//Types
import { NavBarProps } from "@/types";

// Compenents
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

// Redux
import { useAppDispatch } from "@/redux/hooks";
import { onOpen as onRegisterOpen } from "@/redux/modal/registerModalSlice";
import { onOpen as onLoginOpen } from "@/redux/modal/loginModalSlice";
import { onOpen as onRantOpen } from "@/redux/modal/rentModalSlice";

const UserMenu = ({ currentUser }: NavBarProps) => {
  //States
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Redux
  const dispatch = useAppDispatch();

  // Functions
  // Handle Modal Toggle
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  const onRant = useCallback(() => {
    // if not logged in
    if (!currentUser) {
      return dispatch(onLoginOpen());
    }

    // Open Rand Modal
    dispatch(onRantOpen());
  }, [currentUser, dispatch]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={onRant}
          className="hidden md:block rounded-full transition hover:bg-neutral-200 cursor-pointer text-sm py-3 px-4 font-semibold"
        >
          Airbnb your home
        </button>
        <div
          onClick={toggle}
          className="p-4 md:py-1 md:px-2 border-[1px] rounded-full border-neutral-200 flex flex-row items-center gap-3 cursor-pointer  hover:shadow-md transition text-xl"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm cursor-pointer">
          {currentUser ? (
            <>
              <MenuItem
                label="My trips"
                onClick={() => {
                  router.push("/trips");
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="My favorites"
                onClick={() => {
                  router.push("/favorites");

                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="My reservations"
                onClick={() => {
                  router.push("/reservations");
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="My properties"
                onClick={() => {
                  router.push("/properties");

                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="Airbnb my home"
                onClick={() => {
                  onRant();
                  setIsOpen(false);
                }}
              />
              <hr />
              <MenuItem
                label="Logout"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Login"
                onClick={() => {
                  dispatch(onLoginOpen());
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="Signup"
                onClick={() => {
                  dispatch(onRegisterOpen());
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
