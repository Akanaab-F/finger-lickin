import { useLocation } from "react-router-dom";
import styled from "styled-components";

import HeaderBanner from "../components/header/HeaderBanner";
import { getBannerText } from "../helpers";
import ContactMedia from "../components/contact/ContactMedia";
import ContactFaqs from "../components/contact/ContactFaqs";

const Contact = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <HeaderBanner text={getBannerText(pathname)} />
      <StyledContainer className="w-3/4 mx-auto tablet:w-[90%]">
        <ContactMedia />
        <ContactFaqs />
      </StyledContainer>
    </main>
  );
};

export default Contact;

const StyledContainer = styled.div`
  @media only screen and (min-width: 120em) {
    width: 1440px !important;
    margin: 0 auto;
  }
`;
