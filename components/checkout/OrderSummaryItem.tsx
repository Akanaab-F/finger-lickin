import { useCallback } from "react";
import { useAppDispatch } from "../../store";

import { IOrderItemsProps } from "../../types";
import { removeCartItem } from "../../store/slices/cartSlice";
import { generateTopupQueue } from "../../helpers";

import QuantityController from "../buttons/QuantityController";

const OrderSummaryItem: React.FC<IOrderItemsProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  topups,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveOrderItem = useCallback(() => {
    dispatch(removeCartItem(id));
  }, [dispatch, id]);

  return (
    <div className="grid grid-cols-[30%_40%_30%] px-3 py-2 bg-white rounded-md overflow-hidden shadow-md shadow-primary300/10">
      <div className="basis-1/5">
        <img
          className="w-24 h-24 rounded-full basis-[5rem] object-cover"
          src={image}
          alt={`imagery of ${image}`}
        />
      </div>
      <div className="font-regularFont text-base text-text200 flex flex-col justify-evenly">
        <div>
          <span className="text-2xl font-mediumFont text-text400">{name}</span>
        </div>
        <div>
          <span>{generateTopupQueue(topups)}</span>
        </div>
        <div className="uppercase">
          <span>ghc {price.toFixed(2)}</span>
        </div>
      </div>
      <div
        className="flex flex-col justify-evenly
       items-center w-full"
      >
        <div className="w-4/5 flex justify-end" onClick={handleRemoveOrderItem}>
          <span className=" basis-1/3 text-sm text-text200 cursor-pointer">
            remove
          </span>
        </div>
        <div className="grow flex items-center justify-center w-full">
          <QuantityController id={id} quantity={quantity} where="modal" />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
