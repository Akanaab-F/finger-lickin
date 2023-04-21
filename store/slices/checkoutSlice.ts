import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { modal: false },
  reducers: {
    toggleCheckoutModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export default checkoutSlice;
export const { toggleCheckoutModal } = checkoutSlice.actions;
