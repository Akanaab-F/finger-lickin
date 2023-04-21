import styled from "styled-components";

import { IButtonsProps } from "../../types";
import { useCallback } from "react";

type props = IButtonsProps;

const Button: React.FC<props> = ({ text, type, to, onClick }) => {
  const handleClickButton = useCallback(() => {
    onClick && onClick()
  }, [onClick]);

  switch (type) {
    case "primary":
      return (
        <a href={to}>
          <StyledBtn className="bg-primary500 shadow-2xl shadow-primary500/50 rounded-lg text-background100 font-mediumFont text-2xl py-8 px-16 hover:-translate-y-1 transition-all duration-500">
            {text}
          </StyledBtn>
        </a>
      );
    case "secondary":
      return (
        <StyledBtn
          onClick={handleClickButton}
          className="rounded-lg border border-primary500 text-primary500 px-16 py-8 font-mediumFont text-2xl"
        >
          {text}
        </StyledBtn>
      );
  }
};

const StyledBtn = styled.button``;

export default Button;
