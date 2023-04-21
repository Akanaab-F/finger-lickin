import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseStew } from "../../types";

const initialState: IResponseStew = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const stewSlice = createSlice({
  name: "stews",
  initialState,
  reducers: {
    addStews: (state, action: PayloadAction<IResponseStew>) => {
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.results.push(...action.payload.results);
    },
    resetStews: (state) => {
      state.count = initialState.count;
      state.next = initialState.next;
      state.previous = initialState.previous;
      state.results = initialState.results;
    },
  },
});

export default stewSlice;
export const { addStews, resetStews } = stewSlice.actions;
