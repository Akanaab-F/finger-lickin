import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Inputs from "./Inputs";
import TrackingHistory from "../TrackingHistory";

const Search: React.FC<{
  setter: Function;
  formHandler: any;
  placeholder?: string;
  options?: string[];
  optionsSetter?: Function;
}> = ({
  setter,
  formHandler,
  placeholder = "Search...",
  options,
  optionsSetter,
}) => {
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setter(selectedId);
  }, [selectedId, setter]);

  return (
    <StyledSearchForm onSubmit={formHandler} className="my-12 lg:my-4 relative">
      <Inputs
        type="search"
        setter={setter}
        placeholder={placeholder}
        value={selectedId}
      />
      {options && options.length > 0 && (
        <TrackingHistory
          history={options}
          setter={setSelectedId}
          optionsSetter={optionsSetter}
        />
      )}
    </StyledSearchForm>
  );
};

export default Search;

const StyledSearchForm = styled.form`
  @media screen and (min-width: 120em) {
    width: 1800px !important;
    margin: 2rem auto;
  }
`;
