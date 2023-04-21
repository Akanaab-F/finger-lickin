import React from "react";
import styled from "styled-components";

const HeaderBanner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <StyledBackground
      img={require("../../assets/images/background/background-header.jpg")}
      className="w-full h-[30rem] text-background100 font-boldFont text-6xl flex justify-center items-center"
    >
      <StyledHeaderText className="text-center w-2/4 xl:w-3/4 md:w-[90%] sm:w-[95%]">
        <span>{text}</span>
      </StyledHeaderText>
    </StyledBackground>
  );
};

const StyledBackground = styled.div<{ img: string }>`
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledHeaderText = styled.div`
  @media screen and (min-width: 120em) {
    width: 900px !important;
    margin: 0 auto;
  }
`;

export default HeaderBanner;
