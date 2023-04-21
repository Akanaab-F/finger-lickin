import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITopup } from "../../types";

const initialState: ITopup[] = [];

const topupSlice = createSlice({
  name: "topups",
  initialState,
  reducers: {
    addTopup: (state, action: PayloadAction<ITopup[]>) => {
      state.push(...action.payload);
    },
    resetTopup: (state) => {
      state.length = 0;
    },
  },
});

export default topupSlice;
export const { addTopup, resetTopup } = topupSlice.actions;
