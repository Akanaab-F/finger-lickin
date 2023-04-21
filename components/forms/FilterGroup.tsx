import styled from "styled-components";

import SelectInput from "./SelectInput";
import { IFilterOptions } from "../../types";

const FilterGroup: React.FC<IFilterOptions> = ({
  type,
  label,
  options,
}) => {
  return (
    <div className="px-8 border-b-2 border-background300 py-4">
      <div className="text-xl tablet:text-3xl capitalize text-text400">
        {label}
      </div>
      <FilterContainer className="pt-6 flex flex-col tablet:flex-row tablet:flex-wrap tablet:justify-start tablet:gap-5 justify-evenly items-start">
        {options.map(({ id, value }) => (
          <SelectInput
            type={type}
            key={id}
            option={value}
            label={label}
            index={id}
          />
        ))}
      </FilterContainer>
    </div>
  );
};

export default FilterGroup;

const FilterContainer = styled.div``;
