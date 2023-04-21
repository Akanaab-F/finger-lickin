import React from "react";
import { IStew } from "../types";

type props = Pick<IStew, "price">;
const Price: React.FC<props> = ({ price }) => {
  return (
    <div className="tablet:py-8 bg-white w-full rounded-2xl flex justify-evenly items-center py-4 px-4 shadow-lg shadow-primary300/20">
      <span className="text-lg capitalize tablet:text-2xl">only</span>
      <div className="uppercase text-primary500 font-regularFont text-lg tablet:text-2xl">
        ghc <span className="font-boldFont text-5xl">{price}</span>
      </div>
    </div>
  );
};

export default Price;
