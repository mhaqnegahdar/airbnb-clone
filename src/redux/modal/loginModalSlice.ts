import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { ModalState } from "@/types";

// Define the initial state using that type
const initialState = {
  isOpen: false,
} as ModalState;

export const loginModal = createSlice({
  name: "loginModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = loginModal.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.loginModal.isOpen;

export default loginModal.reducer;
