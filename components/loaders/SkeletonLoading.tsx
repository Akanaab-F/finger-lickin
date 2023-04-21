import React from "react";
import styled from 'styled-components';

export const SkelotonCard = () => {
  return (
    <div className="animate-pulse space-x-4 cursor-pointer p-2 bg-white rounded-xl w-80 h-96 grid grid-rows-2 shadow-md shadow-rose-100/60 md:mx-auto">
      <div className="flex items-center justify-center">
        <div className="bg-slate-200 rounded-full w-40 h-40"></div>
      </div>
      <div className="flex justify-evenly items-start flex-col">
        <div className="w-full flex justify-evenly items-start flex-col space-y-2">
          <span className="bg-slate-200 h-8 rounded-lg w-full"></span>
          <div className="bg-slate-200 h-8 rounded-lg w-full"></div>
        </div>
        <div className="w-full flex justify-between items-center basis-1/3 space-x-4">
          <div className="bg-slate-200 h-8 rounded-lg w-full"></div>
          <div className="bg-slate-200 h-8 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoading: React.FC<{
  where: "home" | "menu" | "stew" | "order";
}> = ({ where }) => {
  switch (where) {
    case "home":
      return (
        <div className="grid grid-cols-3 my-12 md:auto-rows-auto md:grid-cols-none md:gap-5 md:mx-auto">
          {[1, 2, 3].map((item) => (
            <SkelotonCard key={item} />
          ))}
        </div>
      );
    case "menu":
      return (
        <StyledMenuContainer className="grid grid-cols-3 gap-y-10 mt-8 gap-x-8 md:auto-rows-auto my-12 md:grid-cols-none md:gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <SkelotonCard key={item} />
          ))}
        </StyledMenuContainer>
      );
    case "stew":
      return (
        <section className="animate-pulse w-4/5 mx-auto mb-10 h-auto">
          <section className="flex tablet:flex-col">
            <div className="basis-1/2 flex flex-col justify-evenly tablet:order-1">
              <span className="bg-slate-200 rounded-md h-20 w-3/4 tablet:my-5 tablet:mx-auto"></span>
              <div className="bg-slate-200 rounded-md w-4/5 h-40 tablet:my-5 tablet:mx-auto"></div>
            </div>
            <div className="grow flex justify-center items-center tablet:order-0">
              <div className="rounded-full w-[28.125rem] h-[25rem] bg-slate-200"></div>
            </div>
          </section>
          <section className="flex justify-between items-center w-2/5">
            <div className="basis-[55%]">
              <span className="bg-slate-200"></span>
            </div>
            <div className="grow bg-slate-200"></div>
          </section>
          <div className="my-16">
            <div>
              <div className="flex w-1/2">
                <div className="h-20 flex items-center w-1/2 ml-10 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-3 gap-14 my-10 w-full rounded-lg space-2">
                <div className="h-20 bg-slate-200 rounded-sm"></div>
                <div className="h-20 bg-slate-200 rounded-sm"></div>
                <div className="h-20 bg-slate-200 rounded-sm"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div className="flex flex-col justify-evenly h-40 bg-slate-200 w-full rounded-lg">
                <div className="rounded-sm h-10"></div>
                <div className="rounded-sm h-30"></div>
              </div>
              <div className="flex flex-col justify-evenly bg-slate-200 w-full rounded-lg"></div>
            </div>
            <div className="w-full flex justify-center items-center pt-10">
              <div className="w-2/5 flex justify-evenly items-center space-x-4">
                <div className="bg-slate-200 h-10 w-full rounded-lg"></div>
                <div className="bg-slate-200 h-10 w-full rounded-lg"></div>
                <div className="bg-slate-200 h-10 w-full rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
      );
    case "order":
      return <div>order</div>;
  }
};

export default SkeletonLoading;
const StyledMenuContainer = styled.div`
  @media screen and (max-width: 108.125em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 58.75em) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
