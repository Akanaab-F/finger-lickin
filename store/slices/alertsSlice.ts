import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlert } from "../../types";

const initialState: IAlert[] = [];

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (
      state,
      action: PayloadAction<Pick<IAlert, "type" | "message">>
    ) => {
      state.push({
        type: action.payload.type,
        message: action.payload.message,
        visible: true,
      });
    },
    resetAlert: (state) => {
      state.length = 0;
    },
    removeAlert: (state) => {
      state.shift()
    }
  },
});

export default alertsSlice;

export const { setAlert, resetAlert, removeAlert } = alertsSlice.actions;
