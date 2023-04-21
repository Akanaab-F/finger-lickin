import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcCartTotal } from "../../helpers";
import { ICart, IOrderItemsProps, IPromocodes, ITopup } from "../../types";
import { filter, some } from "lodash";

const initialState: ICart = {
  orderItems: [],
  subtotal: 0,
  discount: {
    code: null,
    amountDeducted: 0,
  },
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    calcCartAmount: (state) => {
      const { total, subtotal, discount } = calcCartTotal({
        orderItems: state.orderItems,
        discount: state.discount,
      });

      state.total = total;
      state.subtotal = subtotal;
      state.discount.amountDeducted = discount.amountDeducted;
    },
    addToCart: (state, action: PayloadAction<IOrderItemsProps>) => {
      if (filter(state.orderItems, ["id", action.payload.id]).length <= 0) {
        state.orderItems = [...state.orderItems, action.payload];
      }
    },
    applyDiscount: (state, action: PayloadAction<IPromocodes>) => {
      state.discount.code = action.payload;
    },
    resetDiscount: (state) => {
      state.discount.code = initialState.discount.code;
    },
    topupToCart: (
      state,
      action: PayloadAction<{
        id: string;
        topups: ITopup[];
        type: "add" | "remove";
      }>
    ) => {
      const index = state.orderItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.type === "add") {
        state.orderItems[index].topups = [
          ...state.orderItems[index].topups,
          ...action.payload.topups,
        ];
      } else {
        state.orderItems[index].topups = filter(
          state.orderItems[index].topups,
          ({ id }) => id !== action.payload.topups[0].id
        );
      }
    },
    increaseCartItem: (state, action: PayloadAction<string>) => {
      if (some(state.orderItems, ({ id }) => id.includes(action.payload))) {
        const index = state.orderItems.findIndex(
          (item) => item.id === action.payload
        );
        state.orderItems[index].quantity = state.orderItems[index].quantity + 1;
      }
    },
    decreaseCartItem: (state, action: PayloadAction<string>) => {
      if (some(state.orderItems, ({ id }) => id.includes(action.payload))) {
        const index = state.orderItems.findIndex(
          (item) => item.id === action.payload
        );
        state.orderItems[index].quantity = state.orderItems[index].quantity - 1;
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.orderItems = filter(
        state.orderItems,
        ({ id }) => action.payload !== id
      );
    },
    resetCart: (state) => {
      state.discount = initialState.discount;
      state.subtotal = initialState.subtotal;
      state.total = initialState.total;
      state.orderItems = initialState.orderItems;
    },
  },
});

export default cartSlice;
export const {
  addToCart,
  removeCartItem,
  topupToCart,
  resetCart,
  increaseCartItem,
  decreaseCartItem,
  calcCartAmount,
  applyDiscount,
  resetDiscount,
} = cartSlice.actions;
