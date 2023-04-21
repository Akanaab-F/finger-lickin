import { useCallback } from "react";
import styled from "styled-components";

import { filterOptions } from "../../helpers";
import FilterGroup from "./FilterGroup";
import { useAppDispatch } from "../../store";
import { resetFilter } from "../../store/slices/filterSlice";

const Filter = () => {
  const dispatch = useAppDispatch();

  const handleResetCheckbox = useCallback(() => {
    const allCheckbox = document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>;
    allCheckbox.forEach((checkbox) => checkbox.checked = false);
  }, []);

  const handleClearFilters = useCallback(() => {
    dispatch(resetFilter());
    handleResetCheckbox()
  }, [dispatch, handleResetCheckbox]);

  return (
    <StyledFilter className="w-4/5 bg-white rounded-lg tablet:m-auto tablet:w-full">
      <div className="border-b-2 border-background200 py-4 ">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="text-text300 font-mediumFont text-2xl tablet:text-4xl">
            Filter by
          </div>
          <div
            onClick={handleClearFilters}
            className="cursor-pointer basis-2/5 flex items-center justify-evenly text-sm tablet:text-2xl text-red-300 font-regularFont"
          >
            Reset filters
            <svg
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.77293 2.02184C10.0658 1.72894 10.0658 1.25407 9.77293 0.961177C9.48004 0.668284 9.00517 0.668284 8.71228 0.961177L9.77293 2.02184ZM0.226994 9.44646C-0.0658991 9.73935 -0.0658991 10.2142 0.226994 10.5071C0.519887 10.8 0.994761 10.8 1.28765 10.5071L0.226994 9.44646ZM8.71228 10.5071C9.00517 10.8 9.48004 10.8 9.77293 10.5071C10.0658 10.2142 10.0658 9.7393 9.77293 9.44641L8.71228 10.5071ZM1.28765 0.961125C0.994761 0.668232 0.519887 0.668232 0.226994 0.961125C-0.0658991 1.25402 -0.0658991 1.72889 0.226994 2.02179L1.28765 0.961125ZM8.71228 0.961177L0.226994 9.44646L1.28765 10.5071L9.77293 2.02184L8.71228 0.961177ZM9.77293 9.44641L1.28765 0.961125L0.226994 2.02179L8.71228 10.5071L9.77293 9.44641Z"
                fill="#F9B4B4"
              />
            </svg>
          </div>
        </div>
        <div className="text-text100 text-base tablet:text-xl font-regularFont mx-8">
          Filters are available to help you add your own preferences and
          experience in choosing the right stew for you.
        </div>
      </div>
      {filterOptions.map(({ id, type, label, options }) => (
        <FilterGroup
          key={id}
          label={label}
          options={options}
          type={type}
          id={id}
        />
      ))}
    </StyledFilter>
  );
};

export default Filter;

const StyledFilter = styled.div``;
