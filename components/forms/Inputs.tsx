import React, { useCallback } from "react";
import styled from "styled-components";

import { IInputProps } from "../../types";

type props = IInputProps;

const Inputs: React.FC<props & { setter: Function }> = ({
  type,
  placeholder,
  label,
  setter,
  disabled,
  required,
  value,
  min,
  max,
  pattern,
}) => {
  const handleSetter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value),
    [setter]
  );

  switch (type) {
    case "search":
      return (
        <StyledSearch className="w-2/4 mx-auto relative hover:-translate-y-2 transition duration-500 xl:w-3/4 lg:w-4/6">
          <div className="z-20 left-5 top-1/3 absolute">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.6293 21.4217L19.1596 20.8913L19.1596 20.8913L18.6293 21.4217ZM21.4217 18.6292L21.952 18.0989L21.952 18.0989L21.4217 18.6292ZM20.0303 16.1772C19.7374 15.8843 19.2626 15.8844 18.9697 16.1772C18.6768 16.4701 18.6768 16.945 18.9697 17.2379L20.0303 16.1772ZM17.2379 18.9697C16.945 18.6768 16.4701 18.6768 16.1772 18.9697C15.8843 19.2626 15.8844 19.7374 16.1772 20.0303L17.2379 18.9697ZM2.75 10.5C2.75 6.21979 6.21979 2.75 10.5 2.75V1.25C5.39137 1.25 1.25 5.39137 1.25 10.5H2.75ZM10.5 2.75C14.7802 2.75 18.25 6.21979 18.25 10.5H19.75C19.75 5.39137 15.6086 1.25 10.5 1.25V2.75ZM18.25 10.5C18.25 14.7802 14.7802 18.25 10.5 18.25V19.75C15.6086 19.75 19.75 15.6086 19.75 10.5H18.25ZM10.5 18.25C6.21979 18.25 2.75 14.7802 2.75 10.5H1.25C1.25 15.6086 5.39137 19.75 10.5 19.75V18.25ZM20.8914 20.8913C20.4131 21.3696 19.6378 21.3696 19.1596 20.8913L18.0989 21.952C19.1629 23.016 20.888 23.016 21.952 21.952L20.8914 20.8913ZM20.8914 19.1596C21.3696 19.6378 21.3696 20.4131 20.8914 20.8913L21.952 21.952C23.016 20.888 23.016 19.1629 21.952 18.0989L20.8914 19.1596ZM18.9697 17.2379L20.8914 19.1596L21.952 18.0989L20.0303 16.1772L18.9697 17.2379ZM19.1596 20.8913L17.2379 18.9697L16.1772 20.0303L18.0989 21.952L19.1596 20.8913Z"
                fill="#F6523B"
              />
            </svg>
          </div>
          <input
            pattern={pattern}
            maxLength={max}
            minLength={min}
            required={required}
            disabled={disabled}
            defaultValue={value}
            onChange={handleSetter}
            placeholder={placeholder ?? "Search..."}
            type={type}
            className="border border-primary300 shadow-lg shadow-primary400/10 placeholder:text-primary300/80 rounded-full w-full bg-white py-5 pl-16 pr-3 font-regularFont text-xl text-primary400 z-10"
          />
        </StyledSearch>
      );
    case "text":
    case "email":
    case "tel":
      return (
        <StyledText className="flex flex-col gap-y-2">
          <StyledTextLabel className="text-text400 font-regularFont text-base pl-3">
            {label}
          </StyledTextLabel>
          <StyledTextInput
            pattern={pattern}
            maxLength={max}
            minLength={min}
            required={required}
            disabled={disabled}
            value={value}
            onChange={handleSetter}
            placeholder={placeholder}
            type={type}
            className="placeholder:text-slate-300 focus:placeholder:text-slate-300 text-text400 bg-white font-regularFont text-base py-5 pr-5 w-fit rounded-lg pl-3 border border-slate-100 focus:border-slate-500 transition-colors duration-300"
          />
        </StyledText>
      );
  }
};

const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.div``;

const StyledTextLabel = styled.label``;

const StyledTextInput = styled.input`
  width: 100%;
`;

export default Inputs;
