import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { RootState, useAppSelector } from "../store";

import { getBannerText } from "../helpers";

import Filter from "../components/forms/Filter";
import GroupCards from "../components/GroupCards";
import HeaderBanner from "../components/header/HeaderBanner";
import HeaderCard from "../components/header/HeaderCard";
import Search from "../components/forms/Search";
import SkeletonLoading from "../components/loaders/SkeletonLoading";
import SearchResult from "../components/SearchResult";

const Menu = () => {
  const stews = useSelector((state: RootState) => state.stews.results);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const filters = useAppSelector(
    (state: RootState) => state.filterOptions.filters
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  return (
    <main>
      <HeaderBanner text={getBannerText(pathname)} />
      <Search formHandler={handleSearchSubmit} setter={setSearchValue} />
      <StyledSection className="m-48 mb-12 flex justify-center items-start tablet:my-12 tablet:mx-14">
        <div className="basis-1/3 md:basis-[42%] tablet:m-auto tablet:mb-10">
          <Filter />
        </div>
        {searchValue.length <= 0 && filters.length <= 0 ? (
          <div className="grow h-full self-stretch">
            <div className="md:flex md:justify-center">
              <HeaderCard title="All menu" type="secondary" />
            </div>
            {stews.length > 0 ? (
              <GroupCards type="menu" ids={stews.map((stew) => stew.id)} />
            ) : (
              <SkeletonLoading where="menu" />
            )}
          </div>
        ) : (
          <SearchResult search={searchValue} />
        )}
      </StyledSection>
    </main>
  );
};

export default Menu;

const StyledSection = styled.section`
  @media screen and (max-width: 108.125em) and (min-width: 90em) {
    width: 90%;
    margin: 4rem 6rem;
  }
  @media screen and (max-width: 90em) and (min-width: 48em) {
    margin: 3rem;
  }
  @media screen and (max-width: 48em) {
    flex-direction: column;
  }
`;
