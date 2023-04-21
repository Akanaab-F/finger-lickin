import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../buttons/Button";

const Header = () => {
  return (
    <StyledHeader className="w-full h-[45rem] bg-backgroundLayer flex">
      <StyledHeaderContainer className="mx-auto w-4/5 flex xl:w-[90%] md:relative">
        <StyledHeaderLeft className="basis-[60%] my-auto h-4/5 md:grow xs:w-[90%]">
          <div className="flex items-end md:items-center md:justify-center">
            <div className="w-fit py-2 px-4 rounded-lg flex justify-evenly items-center bg-background400 text-primary400 text-sm">
              <span>Free delivery</span>
              <svg
                className="ml-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.46852 9.41435C5.14507 9.15559 4.67311 9.20803 4.41435 9.53148C4.15559 9.85493 4.20803 10.3269 4.53148 10.5857L5.46852 9.41435ZM11.5644 8.49388C11.8372 8.18215 11.8056 7.70833 11.4939 7.43557C11.1822 7.16281 10.7083 7.19439 10.4356 7.50612L11.5644 8.49388ZM6.75282 11.4023L6.2843 11.9879L6.75282 11.4023ZM4.53148 10.5857L6.2843 11.9879L7.22134 10.8166L5.46852 9.41435L4.53148 10.5857ZM8.69453 11.7738L11.5644 8.49388L10.4356 7.50612L7.56566 10.786L8.69453 11.7738ZM6.2843 11.9879C7.01559 12.5729 8.07783 12.4786 8.69453 11.7738L7.56566 10.786C7.47756 10.8867 7.32581 10.9002 7.22134 10.8166L6.2843 11.9879Z"
                  fill="#F6523B"
                />
                <path
                  d="M21.3679 10.1574L20.8549 10.7045L21.3679 10.1574ZM18.577 7.54093L19.0899 6.99377V6.99377L18.577 7.54093ZM6 3.75H10V2.25H6V3.75ZM13.25 7V19H14.75V7H13.25ZM2.75 15V7H1.25V15H2.75ZM10 3.75C11.7949 3.75 13.25 5.20507 13.25 7H14.75C14.75 4.37665 12.6234 2.25 10 2.25V3.75ZM6 2.25C3.37665 2.25 1.25 4.37665 1.25 7H2.75C2.75 5.20507 4.20507 3.75 6 3.75V2.25ZM14 7.75H17.2091V6.25H14V7.75ZM18.064 8.08808L20.8549 10.7045L21.8808 9.61024L19.0899 6.99377L18.064 8.08808ZM21.25 11.6165V17H22.75V11.6165H21.25ZM20.8549 10.7045C21.107 10.9409 21.25 11.271 21.25 11.6165H22.75C22.75 10.8563 22.4354 10.1301 21.8808 9.61024L20.8549 10.7045ZM20 19.75C21.5188 19.75 22.75 18.5188 22.75 17H21.25C21.25 17.6904 20.6904 18.25 20 18.25V19.75ZM17.2091 7.75C17.5267 7.75 17.8323 7.87088 18.064 8.08808L19.0899 6.99377C18.5802 6.51593 17.9078 6.25 17.2091 6.25V7.75ZM8.25 19C8.25 19.6904 7.69036 20.25 7 20.25V21.75C8.51878 21.75 9.75 20.5188 9.75 19H8.25ZM7 20.25C6.30964 20.25 5.75 19.6904 5.75 19H4.25C4.25 20.5188 5.48122 21.75 7 21.75V20.25ZM7 17.75C7.69036 17.75 8.25 18.3096 8.25 19H9.75C9.75 17.4812 8.51878 16.25 7 16.25V17.75ZM19.25 19C19.25 19.6904 18.6904 20.25 18 20.25V21.75C19.5188 21.75 20.75 20.5188 20.75 19H19.25ZM18 20.25C17.3096 20.25 16.75 19.6904 16.75 19H15.25C15.25 20.5188 16.4812 21.75 18 21.75V20.25ZM16.75 19C16.75 18.3096 17.3096 17.75 18 17.75V16.25C16.4812 16.25 15.25 17.4812 15.25 19H16.75ZM18 17.75C18.6904 17.75 19.25 18.3096 19.25 19H20.75C20.75 17.4812 19.5188 16.25 18 16.25V17.75ZM14 19.75H16V18.25H14V19.75ZM5.75 19C5.75 18.9734 5.75082 18.9471 5.75242 18.9211L4.25527 18.8288C4.25177 18.8855 4.25 18.9426 4.25 19H5.75ZM5.75242 18.9211C5.79272 18.2679 6.33617 17.75 7 17.75V16.25C5.53868 16.25 4.34405 17.3894 4.25527 18.8288L5.75242 18.9211ZM5.19006 18.1485C3.78658 17.7887 2.75 16.5145 2.75 15H1.25C1.25 17.216 2.76675 19.0758 4.81763 19.6015L5.19006 18.1485ZM9 19.75H14V18.25H9V19.75Z"
                  fill="#F6523B"
                />
              </svg>
            </div>
          </div>
          <StyledMainHeading className="flex items-center md:justify-center md:text-center">
            <h1 className="font-boldFont text-6xl text-primary400 leading-[4rem] xxs:text-[24px]">
              Spice up your campus life! <br /> with the best stew <br />
              provider!
            </h1>
          </StyledMainHeading>
          <StyledHeaderButtons className="w-2/3 flex justify-between items-center xl:w-3/4 md:mx-auto md:justify-evenly xs:w-[90%] xxs:w-[95%] xxxs:w-full">
            <Button text="Order now!" type="primary" to="#campuslist" />
            <Link to="/track">
              <Button text="Track your order" type="secondary" />
            </Link>
          </StyledHeaderButtons>
        </StyledHeaderLeft>
        <StyledHeaderRight className="flex flex-grow relative md:absolute md:w-full md:-z-10 md:h-full md:overflow-hidden">
          <div className="w-fit absolute top-0 left-0 xl:-left-8 md:translate-x-[0] md:translate-y-[0] lg:translate-x-10">
            <img
              className="object-cover lg:h-80 lg:w-80"
              src={require("../../assets/images/beef-header-picture.png")}
              alt="header imagery"
            />
          </div>
          <div className="w-fit absolute top-1/3 left-2/4 md:left-0 md:top-0 md:translate-x-[20rem] md:translate-y-[25rem] xs:translate-x-[15rem]">
            <img
              className="object-fit lg:h-60 lg:w-80 md:w-64"
              src={require("../../assets/images/palava-header-picture.png")}
              alt="header imagery"
            />
          </div>
          <div className="w-fit absolute bottom-3 left-0 xl:bottom-28 lg:-left-16 md:left-0 md:top-0 md:translate-y-[0] md:translate-x-[40rem] sm:translate-x-[34rem] xs:translate-x-[28rem] xxs:translate-x-[23rem]">
            <img
              className="object-cover lg:h-80 lg:w-80"
              src={require("../../assets/images/chicken-header-picture.png")}
              alt="header imagery"
            />
          </div>
        </StyledHeaderRight>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header``;

const StyledHeaderLeft = styled.div`
  display: grid;
  grid-template-rows: 15% 50% 20%;
`;

const StyledHeaderRight = styled.div``;
const StyledMainHeading = styled.div`
  @media screen and (max-width: 96.875em) and (min-width: 90.1em) {
    width: 110%;
  }

  @media screen and (max-width: 85.375em) and (min-width: 81.26em) {
    h1 {
      font-size: 50px;
    }
  }

  @media screen and (max-width: 81.25em) and (min-width: 64em) {
    h1 {
      font-size: 48px;
      position: relative;
      z-index: 20;
    }
  }

  @media screen and (max-width: 26.6em) and (min-width: 25.625em) {
    h1 {
      font-size: 25px;
    }
  }
`;

const StyledHeaderButtons = styled.div`
  @media screen and (max-width: 108.125em) and (min-width: 90.1em) {
    width: 80%;
  }

  @media screen and (max-width: 85.375em) and (min-width: 81.26em) {
    width: 80%;
  }

  @media screen and (max-width: 81.25em) and (min-width: 68.75em) {
    width: 94%;
  }

  @media screen and (max-width: 68.125em) and (min-width: 64em) {
    width: 100%;
  }

  @media screen and (max-width: 65em) and (min-width: 63em) {
    width: 80%;
  }
`;

const StyledHeaderContainer = styled.div`
  @media screen and (min-width: 120em) {
    width: 1560px !important;
    margin: 0 auto;
  }
`;

export default Header;
