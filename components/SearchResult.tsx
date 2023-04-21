import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RootState, useAppSelector } from "../store";

import { IStew } from "../types";
import ErrorHandler from "../helpers/functions/Errors/ErrorHandler";

import { searchFilter } from "../services";

import HeaderCard from "./header/HeaderCard";
import GroupCards from "./GroupCards";
import { SkelotonCard } from "./loaders/SkeletonLoading";

const SearchResult: React.FC<{ search: string }> = ({ search }) => {
  const filters = useAppSelector(
    (state: RootState) => state.filterOptions.filters
  );

  const [results, setResults] = useState<IStew[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(true);
    searchFilter(
      search,
      filters
        .filter(({ type }) => type === "ingredients")
        .map(({ value }) => value)
    )
      .then(({ data }) => {
        setDisabled(false);
        setResults(data.results);
      })
      .catch((error) => {
        setDisabled(false);
        ErrorHandler(error.code, error.message);
      });
  }, [search, filters]);

  return (
    <StyledResult className="grow mx-auto max-w-7xl xl:w-3/4">
      <HeaderCard title="search results" type="secondary" />
      {disabled ? (
        <div className="grid grid-cols-3 gap-y-10 mt-8 gap-x-8 md:auto-rows-auto my-12 md:grid-cols-none md:gap-5">
          {[1, 2, 3].map(() => (
            <SkelotonCard key={v4()} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <GroupCards type="search" ids={results.map((result) => result.id)} />
      ) : (
        <div className="w-full h-80 flex justify-center items-center">
          <span className="text-3xl capitalize">nothing found</span>
        </div>
      )}
    </StyledResult>
  );
};

export default SearchResult;

const StyledResult = styled.section`
  @media only screen and (min-width: 120em) {
    width: 1024px !important;
    margin: 0 auto;
  }
`;
