import React, { useCallback } from "react";
import { calcOrderAndTopups, generateTopupQueue } from "../helpers";

import { IOrderItemsProps } from "../types";
import QuantityController from "./buttons/QuantityController";
import { useAppDispatch } from "../store";
import { removeCartItem } from "../store/slices/cartSlice";

type props = IOrderItemsProps;

const OrderItemCard: React.FC<props> = ({
  id,
  name,
  image,
  price,
  quantity,
  topups,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveOrderItem = useCallback(() => {
    dispatch(removeCartItem(id));
  }, [dispatch, id]);

  return (
    <div className="flex items-center bg-white w-full p-4 gap-2 relative">
      <div
        onClick={handleRemoveOrderItem}
        className="absolute right-2 top-2 cursor-pointer"
      >
        <span className="text-sm text-red-300">remove</span>
      </div>
      <img
        className="w-24 h-24 rounded-full basis-[5rem] object-cover"
        src={image}
        alt={`imagery of ${image}`}
      />
      <div className="self-stretch flex flex-col justify-evenly items-start grow">
        <span className="capitalize font-mediumFont text-2xl text-text400">
          {name}
        </span>
        {topups && <div>{generateTopupQueue(topups)}</div>}
        <div className="flex justify-between items-center grow w-full">
          <QuantityController where="modal" quantity={quantity} id={id} />
          <div className="uppercase flex justify-center items-center font-boldFont text-3xl text-text300 basis-24">
            <span className="font-regularFont text-slate-500 text-sm uppercase">
              ghc
            </span>
            &nbsp;
            {calcOrderAndTopups(price, quantity, topups)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
