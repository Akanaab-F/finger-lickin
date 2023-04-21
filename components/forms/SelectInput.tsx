import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IFilterOptions, IFilterProps } from "../../types";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { addFilter, removeFilter } from "../../store/slices/filterSlice";
import { some } from "lodash";

interface SelectInputProps extends Pick<IFilterOptions, "label" | "type"> {
  index: string;
  option: string;
}

type Props = SelectInputProps;

const SelectInput: React.FC<Props> = ({ type, index, label, option }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state: RootState) => state.filterOptions.filters
  );

  const checkboxElement = useRef<HTMLInputElement>(null);
  const [filterType] = useState<Pick<IFilterProps, "type">>({
    type: label === "ingredients" ? "ingredients" : "discount",
  });

  const handleCheckedBox = useCallback(() => {
    if (checkboxElement.current !== null) {
      if (!checkboxElement.current.checked) {
        checkboxElement.current.checked = true;
        dispatch(
          addFilter({ type: filterType.type, value: option.toLowerCase() })
        );
      } else {
        checkboxElement.current.checked = false;
        dispatch(
          removeFilter({ type: filterType.type, value: option.toLowerCase() })
        );
      }
    }
  }, [dispatch, option, filterType.type]);

  useEffect(() => {
    if (some(filters, ["value", option])) {
      if (checkboxElement.current !== null)
        checkboxElement.current.checked = true;
    }
  }, [filters, option]);

  return (
    <StyledCheckboxContainer
      onClick={handleCheckedBox}
      key={index}
      className="flex items-center"
    >
      <input
        ref={checkboxElement}
        className="hidden"
        id={`checkBox-${option.split(" ").join("-")}`}
        name={`checkBox-${label.split(" ").join("-")}`}
        type={type}
        value={option.split(" ").join("-")}
      />
      <label
        className="bg-transparent border-text100 border w-4 h-4 rounded transition-all duration-500"
        htmlFor={`checkBox-${option.split(" ").join("-")}`}
      ></label>
      <div className="text-sm tablet:text-2xl font-regularFont text-300 pl-5 capitalize py-2">
        {option}
      </div>
    </StyledCheckboxContainer>
  );
};

const StyledCheckboxContainer = styled.div`
  cursor: pointer;

  input:checked + label {
    border-color: transparent;
    background-color: #f6523b;
  }
`;

export default SelectInput;
