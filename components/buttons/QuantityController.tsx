import React, { useCallback } from "react";

import {
  calcCartAmount,
  decreaseCartItem,
  increaseCartItem,
} from "../../store/slices/cartSlice";

import { IQuantityProps } from "../../types";
import { useAppDispatch } from "../../store";

type props = IQuantityProps;

const QuantityController: React.FC<
  props & { id: string; where: "modal" | "page"; setter?: Function }
> = ({ quantity, id, where, setter }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = useCallback(
    (type: "increase" | "decrease") => {
      switch (type) {
        case "increase":
          dispatch(increaseCartItem(id));
          setter && setter(quantity + 1);
          break;
        case "decrease":
          dispatch(decreaseCartItem(id));
          setter && setter(quantity - 1);
          break;
      }
      dispatch(calcCartAmount());
    },
    [dispatch, id, quantity, setter]
  );

  switch (where) {
    case "modal":
      return (
        <div className="border border-text-300 flex rounded-md py-1 px-2 justify-between items-center w-4/5">
          <div
            onClick={() => handleQuantityChange("decrease")}
            className={quantity <= 1 ? "pointer-events-none" : "cursor-pointer"}
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10V10.75V10ZM6 14V14.75V14ZM18 14V13.25V14ZM18 10V9.25V10ZM18 13.25L6 13.25V14.75L18 14.75V13.25ZM6 10.75L18 10.75V9.25L6 9.25V10.75ZM4.75 12C4.75 11.3096 5.30964 10.75 6 10.75V9.25C4.48122 9.25 3.25 10.4812 3.25 12H4.75ZM6 13.25C5.30964 13.25 4.75 12.6904 4.75 12H3.25C3.25 13.5188 4.48122 14.75 6 14.75V13.25ZM19.25 12C19.25 12.6904 18.6904 13.25 18 13.25V14.75C19.5188 14.75 20.75 13.5188 20.75 12H19.25ZM20.75 12C20.75 10.4812 19.5188 9.25 18 9.25V10.75C18.6904 10.75 19.25 11.3096 19.25 12H20.75Z"
                fill={quantity <= 1 ? "#CDCCCC" : "#686767"}
              />
            </svg>
          </div>
          <div>{quantity}</div>
          <div
            onClick={() => handleQuantityChange("increase")}
            className="cursor-pointer"
          >
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10V9.25V10ZM6 14L6 13.25H6V14ZM14 10H13.25C13.25 10.4142 13.5858 10.75 14 10.75V10ZM14 14V13.25C13.5858 13.25 13.25 13.5858 13.25 14H14ZM10 14H10.75C10.75 13.5858 10.4142 13.25 10 13.25V14ZM10 10V10.75C10.1989 10.75 10.3897 10.671 10.5303 10.5303C10.671 10.3897 10.75 10.1989 10.75 10H10ZM12 19.25C11.3096 19.25 10.75 18.6904 10.75 18H9.25C9.25 19.5188 10.4812 20.75 12 20.75V19.25ZM13.25 18C13.25 18.6904 12.6904 19.25 12 19.25V20.75C13.5188 20.75 14.75 19.5188 14.75 18H13.25ZM12 4.75C12.6904 4.75 13.25 5.30964 13.25 6H14.75C14.75 4.48122 13.5188 3.25 12 3.25V4.75ZM12 3.25C10.4812 3.25 9.25 4.48122 9.25 6H10.75C10.75 5.30964 11.3096 4.75 12 4.75V3.25ZM4.75 12C4.75 11.3096 5.30964 10.75 6 10.75V9.25C4.48122 9.25 3.25 10.4812 3.25 12H4.75ZM6 13.25C5.30964 13.25 4.75 12.6904 4.75 12H3.25C3.25 13.5188 4.48122 14.75 6 14.75V13.25ZM19.25 12C19.25 12.6904 18.6904 13.25 18 13.25V14.75C19.5188 14.75 20.75 13.5188 20.75 12H19.25ZM20.75 12C20.75 10.4812 19.5188 9.25 18 9.25V10.75C18.6904 10.75 19.25 11.3096 19.25 12H20.75ZM14 10.75H18V9.25H14V10.75ZM13.25 6V10H14.75V6H13.25ZM13.25 14V18H14.75V14H13.25ZM18 13.25H14V14.75H18V13.25ZM10 13.25L6 13.25L6 14.75L10 14.75V13.25ZM10.75 18V14H9.25V18H10.75ZM6 10.75L10 10.75V9.25L6 9.25L6 10.75ZM9.25 6V10H10.75V6H9.25Z"
                fill="#686767"
              />
            </svg>
          </div>
        </div>
      );
    case "page":
      return (
        <div className="basis-1/4 capitalize text-primary400 flex items-center font-regularFont text-xl justify-between">
          <div className="w-full flex justify-evenly items-center">
            <div
              onClick={() => handleQuantityChange("decrease")}
              className={
                quantity <= 1 ? "pointer-events-none" : "cursor-pointer"
              }
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V10.75V10ZM6 14V14.75V14ZM18 14V13.25V14ZM18 10V9.25V10ZM18 13.25L6 13.25V14.75L18 14.75V13.25ZM6 10.75L18 10.75V9.25L6 9.25V10.75ZM4.75 12C4.75 11.3096 5.30964 10.75 6 10.75V9.25C4.48122 9.25 3.25 10.4812 3.25 12H4.75ZM6 13.25C5.30964 13.25 4.75 12.6904 4.75 12H3.25C3.25 13.5188 4.48122 14.75 6 14.75V13.25ZM19.25 12C19.25 12.6904 18.6904 13.25 18 13.25V14.75C19.5188 14.75 20.75 13.5188 20.75 12H19.25ZM20.75 12C20.75 10.4812 19.5188 9.25 18 9.25V10.75C18.6904 10.75 19.25 11.3096 19.25 12H20.75Z"
                  fill={quantity <= 1 ? "#ffb3a9" : "#F6523B"}
                />
              </svg>
            </div>
            <div className="px-4 py-2 shadow-primary400/30 bg-white rounded-md shadow-md">
              {quantity}
            </div>
            <div
              onClick={() => handleQuantityChange("increase")}
              className="cursor-pointer"
            >
              <svg
                width="2rem"
                height="2rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V9.25V10ZM6 14L6 13.25H6V14ZM14 10H13.25C13.25 10.4142 13.5858 10.75 14 10.75V10ZM14 14V13.25C13.5858 13.25 13.25 13.5858 13.25 14H14ZM10 14H10.75C10.75 13.5858 10.4142 13.25 10 13.25V14ZM10 10V10.75C10.1989 10.75 10.3897 10.671 10.5303 10.5303C10.671 10.3897 10.75 10.1989 10.75 10H10ZM12 19.25C11.3096 19.25 10.75 18.6904 10.75 18H9.25C9.25 19.5188 10.4812 20.75 12 20.75V19.25ZM13.25 18C13.25 18.6904 12.6904 19.25 12 19.25V20.75C13.5188 20.75 14.75 19.5188 14.75 18H13.25ZM12 4.75C12.6904 4.75 13.25 5.30964 13.25 6H14.75C14.75 4.48122 13.5188 3.25 12 3.25V4.75ZM12 3.25C10.4812 3.25 9.25 4.48122 9.25 6H10.75C10.75 5.30964 11.3096 4.75 12 4.75V3.25ZM4.75 12C4.75 11.3096 5.30964 10.75 6 10.75V9.25C4.48122 9.25 3.25 10.4812 3.25 12H4.75ZM6 13.25C5.30964 13.25 4.75 12.6904 4.75 12H3.25C3.25 13.5188 4.48122 14.75 6 14.75V13.25ZM19.25 12C19.25 12.6904 18.6904 13.25 18 13.25V14.75C19.5188 14.75 20.75 13.5188 20.75 12H19.25ZM20.75 12C20.75 10.4812 19.5188 9.25 18 9.25V10.75C18.6904 10.75 19.25 11.3096 19.25 12H20.75ZM14 10.75H18V9.25H14V10.75ZM13.25 6V10H14.75V6H13.25ZM13.25 14V18H14.75V14H13.25ZM18 13.25H14V14.75H18V13.25ZM10 13.25L6 13.25L6 14.75L10 14.75V13.25ZM10.75 18V14H9.25V18H10.75ZM6 10.75L10 10.75V9.25L6 9.25L6 10.75ZM9.25 6V10H10.75V6H9.25Z"
                  fill="#F6523B"
                />
              </svg>
            </div>
          </div>
        </div>
      );
  }
};

export default QuantityController;
