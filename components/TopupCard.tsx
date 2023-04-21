import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITopup } from "../types";
import Checkbox from "./forms/Checkbox";
import { RootState, useAppSelector } from "../store";
import { some } from "lodash";

interface TopupProps extends ITopup {
  setter: Function;
  checked?: boolean;
}

type props = TopupProps;

const TopupCard: React.FC<props & { stewId: string }> = ({
  id,
  name,
  price,
  setter,
  stewId,
  checked = false,
}) => {
  const [status, setStatus] = useState(checked);
  const orderItems = useAppSelector(
    (state: RootState) => state.cart.orderItems
  );

  const handleClickCard = () => {
    setStatus(!status);
    setter({ id, name, price });
  };

  useEffect(() => {
    if (some(orderItems, ["id", stewId])) return;
    setStatus(checked);
  }, [orderItems, stewId, checked]);

  return (
    <div
      onClick={handleClickCard}
      className={
        (status ? "text-primary400" : "text-text300") +
        ` flex justify-evenly items-center w-fit p-2 cursor-pointer text-2xl font-mediumFont transition-all duration-500`
      }
    >
      <Checkbox status={status} index={uuidv4()} />
      <div className="ml-2 capitalize">{name}</div>
      <div className="ml-2">+{price}ghc</div>
    </div>
  );
};

export default TopupCard;
