import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

// Define a type for the slice state
interface RegisterModalSlice {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState = {
  isOpen: false,
} as RegisterModalSlice;

export const registerModalSlice = createSlice({
  name: "registerModal",
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

export const { onOpen, onClose } = registerModalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsOpen = (state: RootState) => state.registerModal.isOpen;

export default registerModalSlice.reducer;
