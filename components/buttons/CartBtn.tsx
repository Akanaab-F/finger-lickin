import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../store";

const CartBtn: React.FC<{ viewport: "mobile" | "desktop" }> = ({
  viewport,
}) => {
  const cart = useSelector((state: RootState) => state.cart.orderItems);

  return (
    <div className="flex flex-col justify-between items-center">
      <StyledCart
        className={
          (viewport === "desktop"
            ? "bg-white shadow-md shadow-primary300/30 w-12 h-12"
            : "") + " flex justify-center items-center"
        }
      >
        <StyledCartCount className="bg-primary400 flex justify-center content-center w-5 h-5">
          <span className="text-white text-base md:text-xl">{cart.length}</span>
        </StyledCartCount>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9.33333H12.75H12ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8L12.75 8ZM20.75 8C20.75 7.58579 20.4142 7.25 20 7.25C19.5858 7.25 19.25 7.58579 19.25 8H20.75ZM20 9.33333L20.75 9.33333V9.33333H20ZM16 13.3333V14.0833V13.3333ZM12.75 9.33333L12.75 8L11.25 8L11.25 9.33333L12.75 9.33333ZM19.25 8V9.33333H20.75V8H19.25ZM16 12.5833C14.2051 12.5833 12.75 11.1283 12.75 9.33333L11.25 9.33333C11.25 11.9567 13.3766 14.0833 16 14.0833V12.5833ZM16 14.0833C18.6234 14.0833 20.75 11.9567 20.75 9.33333L19.25 9.33333C19.25 11.1283 17.7949 12.5833 16 12.5833V14.0833Z"
            fill="#F6523B"
          />
          <path
            d="M26.0761 8.45654L26.8159 8.33324L26.0761 8.45654ZM28.2983 21.7899L27.5585 21.9132L28.2983 21.7899ZM5.92392 8.45654L5.18412 8.33324L5.92392 8.45654ZM3.70169 21.7899L4.44149 21.9132L3.70169 21.7899ZM11.1847 4.75H20.8153V3.25H11.1847V4.75ZM25.3363 8.57984L27.5585 21.9132L29.0381 21.6666L26.8159 8.33324L25.3363 8.57984ZM23.0375 27.25H8.96246V28.75H23.0375V27.25ZM5.18412 8.33324L2.9619 21.6666L4.44149 21.9132L6.66371 8.57984L5.18412 8.33324ZM11.1847 3.25C8.21091 3.25 5.67301 5.39993 5.18412 8.33324L6.66371 8.57984C7.03205 6.36981 8.94417 4.75 11.1847 4.75V3.25ZM20.8153 4.75C23.0558 4.75 24.968 6.36981 25.3363 8.57984L26.8159 8.33324C26.327 5.39993 23.7891 3.25 20.8153 3.25V4.75ZM27.5585 21.9132C28.0241 24.7069 25.8698 27.25 23.0375 27.25V28.75C26.7967 28.75 29.6561 25.3746 29.0381 21.6666L27.5585 21.9132ZM8.96246 27.25C6.13024 27.25 3.97587 24.7069 4.44149 21.9132L2.9619 21.6666C2.3439 25.3746 5.20333 28.75 8.96246 28.75V27.25Z"
            fill="#F6523B"
          />
        </svg>
      </StyledCart>
    </div>
  );
};

const StyledCart = styled.div`
  position: relative;
  border-radius: 50%;
  pointer: cursor;

  @media only screen and (max-width: 58.75em) {
    width: 32px;
    height: 32px;
    border-radius: 0;
  }

  svg {
    width: 2rem;
    height: 2rem;

    @media only screen and (max-width: 58.75em) {
      width: 32px;
      height: 32px;
    }

    @media only screen and (max-width: 40em) {
      width: 24px;
      height: 24px;
    }
  }
`;

const StyledCartCount = styled.div`
  position: absolute;
  border-radius: 50%;
  top: 0.1rem;
  right: 0.3rem;

  @media only screen and (max-width: 58.75em) {
    top: -0.2rem;
    right: 0rem;
    width: 15px;
    height: 15px;
  }
`;

export default CartBtn;
