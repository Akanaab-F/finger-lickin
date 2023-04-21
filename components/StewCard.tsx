import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { generateTopupQueue } from "../helpers";

import { IStew } from "../types";

import ViewMoreBtn from "./buttons/ViewMoreBtn";

type props = Pick<IStew, "id" | "name" | "image" | "price" | "topups">;

const StewCard: React.FC<props> = ({ id, name, image, price, topups }) => {
  return (
    <StyledLink
      to={`/stew/${id}`}
      className="m-auto cursor-pointer p-2 tablet:p-0 tabley:rounded-lg tablet:overflow-hidden bg-white rounded-xl w-80 md:w-96 xs:w-4/6 xxs:w-5/6 h-[30rem] xs:h-[35rem] grid grid-rows-2 shadow-xl shadow-primary400/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary400/20"
    >
      <div className="flex items-center justify-center">
        <img
          className="rounded-full w-40 h-40 object-cover tablet:rounded-none tablet:w-full tablet:h-full"
          src={image}
          alt={`imagery of ${name}`}
        />
      </div>
      <div className="flex justify-evenly items-start flex-col p-2 md:px-5">
        <div className="w-full flex justify-evenly items-start flex-col">
          <h4 className="capitalize text-text400 font-regularFont text-2xl tablet:text-3xl xs:text-4xl">
            {name}
          </h4>
          <div className="text-text200 tablet:text-xl xs:text-2xl">{generateTopupQueue(topups)}</div>
        </div>
        <div className="w-full flex justify-between items-center basis-1/3">
          <div className="uppercase text-text400 font-regularFont text-2xl tablet:text-3xl xs:text-4xl">
            ghc {price.toFixed(2)}
          </div>
          <ViewMoreBtn />
        </div>
      </div>
    </StyledLink>
  );
};

export default StewCard;

const StyledLink = styled(Link)`
  @media screen and (max-width: 108.125em) {
    margin: 0;
  }

  @media screen and (max-width: 58.75em) and (min-width: 48em) {
    margin: 0 5rem;
  }

  @media screen and (max-width: 48em) {
    margin: 0 auto;
  }
`;
