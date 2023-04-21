import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

import { RootState, useAppDispatch, useAppSelector } from "../store";
import { addStews } from "../store/slices/stewSlice";

import StewCard from "./StewCard";
import Button from "./buttons/Button";
import { getStewsPagination } from "../services";
import ErrorHandler from "../helpers/functions/Errors/ErrorHandler";
import { IResponseStew } from "../types";
import { SkelotonCard } from "./loaders/SkeletonLoading";
import { filter } from "lodash";

const GroupCards: React.FC<{
  type: "home" | "menu" | "search";
  ids: string[];
}> = ({ type, ids }) => {
  const dispatch = useAppDispatch();
  const stews = useAppSelector((state: RootState) => state.stews.results);
  const stewCount = useAppSelector((state: RootState) => state.stews.count);
  const groupedStews = filter(stews, (o) => ids.includes(o.id));

  const [offset, setOffset] = useState<number>(9);
  const [limit] = useState<number>(9);
  const [disabled, setDisabled] = useState(false);

  const handleShowMoreStews = useCallback(() => {
    setDisabled(true);
    getStewsPagination(offset, limit)
      .then(({ data }: { data: IResponseStew }) => {
        dispatch(addStews(data));
        setDisabled(false);
      })
      .catch((error) => {
        dispatch(ErrorHandler(error.code, error.message));
        setDisabled(false);
      });
    if (stews.length < stewCount) {
      setOffset(offset + 9);
    }
  }, [limit, offset, stews.length, stewCount, dispatch]);

  switch (type) {
    case "home":
      return (
        <div className="grid grid-cols-3 md:grid-cols-2 tablet:auto-rows-auto my-12 tablet:grid-cols-none md:gap-5">
          {groupedStews.map(({ id, image, topups, price, name }) => (
            <StewCard
              key={id}
              id={id}
              name={name}
              image={image}
              price={price}
              topups={topups}
            />
          ))}
        </div>
      );
    case "menu":
      return (
        <StyledMenuContainer className="grid grid-cols-3 gap-y-10 mt-8 gap-x-8 md:auto-rows-auto my-12 md:grid-cols-none md:gap-5">
          {groupedStews.map(({ id, image, topups, price, name }) => (
            <StewCard
              key={id}
              id={id}
              name={name}
              image={image}
              price={price}
              topups={topups}
            />
          ))}
          {disabled && [1, 2, 3].map(() => <SkelotonCard key={v4()} />)}
          {stews.length < stewCount && (
            <StyledShowMore className="flex justify-center items-center my-5">
              <Button
                text="Show more!"
                type="secondary"
                onClick={handleShowMoreStews}
              />
            </StyledShowMore>
          )}
        </StyledMenuContainer>
      );
    case "search":
      return (
        <StyledMenuContainer className="grid grid-cols-3 gap-y-10 mt-8 gap-x-8 md:auto-rows-auto my-12 md:grid-cols-none md:gap-5">
          {groupedStews.map(({ id, image, topups, price, name }) => (
            <StewCard
              key={id}
              id={id}
              name={name}
              image={image}
              price={price}
              topups={topups}
            />
          ))}
        </StyledMenuContainer>
      );
  }
};

export default GroupCards;

const StyledShowMore = styled.div`
  grid-column: 1 /-1;
`;

const StyledMenuContainer = styled.div`
  @media screen and (max-width: 108.125em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 58.75em) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
