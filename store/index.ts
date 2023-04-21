import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import checkoutSlice from "./slices/checkoutSlice";
import stewSlice from "./slices/stewSlice";
import topupSlice from "./slices/topupSlice";
import alertsSlice from "./slices/alertsSlice";
import trackingSlice from "./slices/trackingSlice";
import filterSlice from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    stews: stewSlice.reducer,
    topups: topupSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    alerts: alertsSlice.reducer,
    tracking: trackingSlice.reducer,
    filterOptions: filterSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./hooks";
