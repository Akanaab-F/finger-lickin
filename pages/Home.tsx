import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { RootState } from "../store";
import { shuffleStews } from "../helpers";

import Button from "../components/buttons/Button";
import CampusList from "../components/CampusList";
import GroupCards from "../components/GroupCards";
import Header from "../components/header/Header";
import Search from "../components/forms/Search";
import HeaderCard from "../components/header/HeaderCard";
import SkeletonLoading from "../components/loaders/SkeletonLoading";
import SearchResult from "../components/SearchResult";

const Home = () => {
  const stews = useSelector((state: RootState) => state.stews.results);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
    []
  );

  return (
    <main>
      <Header />
      <CampusList />
      <Search formHandler={handleSearchSubmit} setter={setSearchValue} />
      {searchValue.length <= 0 ? (
        <StyledProducts className="w-3/5 mx-auto xl:w-3/4">
          <section className="w-full mx-auto flex flex-col justify-between my-16">
            <div className="mx-7 md:flex md:justify-center">
              <HeaderCard type="secondary" title="recommended" />
            </div>
            {stews.length > 0 ? (
              <GroupCards type="home" ids={shuffleStews(stews)} />
            ) : (
              <SkeletonLoading where="home" />
            )}
          </section>
          <section className="w-full mx-auto flex flex-col justify-between my-16">
            <div className="mx-7  md:flex md:justify-center">
              <HeaderCard type="secondary" title="popular stews" />
            </div>
            {stews.length > 0 ? (
              <GroupCards type="home" ids={shuffleStews(stews)} />
            ) : (
              <SkeletonLoading where="home" />
            )}
          </section>
          <section className="flex justify-center items-center w-full mx-auto my-8">
            <Link to="/menu">
              <Button text="Show menu" type="secondary" />
            </Link>
          </section>
        </StyledProducts>
      ) : (
        <SearchResult search={searchValue} />
      )}
    </main>
  );
};

export default Home;

const StyledProducts = styled.section`
  @media screen and (min-width: 120em) {
    width: 1080px !important;
    margin: 0 auto;
  }

  @media screen and (max-width: 101.375em) and (min-width: 90em) {
    width: 75%;
  }

  @media screen and (max-width: 81.75em) and (min-width: 69.75em) {
    width: 85%;
  }
  @media screen and (max-width: 69.75em) and (min-width: 64em) {
    width: 90%;
  }
`;
