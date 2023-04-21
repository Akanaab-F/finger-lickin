import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilterProps } from "../../types";
import { filter } from "lodash";

type props = {
  filters: IFilterProps[];
};

const initialState: props = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<IFilterProps>) => {
      state.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<IFilterProps>) => {
      const filtered = filter(
        state.filters,
        (option) => option.value !== action.payload.value
      );
      state.filters = filtered;
    },
    resetFilter: (state) => {
      state.filters.length = 0;
    },
  },
});

export default filterSlice;

export const { addFilter, removeFilter, resetFilter } = filterSlice.actions;
