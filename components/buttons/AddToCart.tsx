import React, {  useCallback } from "react";
import styled from "styled-components";

import { toggleCheckoutModal } from "../../store/slices/checkoutSlice";
import { useAppDispatch } from "../../store";

const AddToCart: React.FC<{ addToCart: Function, addedToCart: boolean, setter :Function}> = ({ addToCart, addedToCart, setter }) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    setter(true);
    if (!addedToCart) return addToCart();
    if (addedToCart) return dispatch(toggleCheckoutModal());
  }, [dispatch, addToCart, addedToCart, setter]);

  return (
    <StyledBtn
      onClick={handleButtonClick}
      className="bg-primary400 text-base tablet:text-xl text-background300 rounded-lg p-3 transition-all duration-500 cursor-pointer flex justify-center items-center"
    >
      {addedToCart ? "Checkout cart" : "Add to cart"}
      <div className="ml-2">
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.25 6.73413C15.25 7.14834 15.5858 7.48413 16 7.48413C16.4142 7.48413 16.75 7.14834 16.75 6.73413H15.25ZM7.25 6.73413C7.25 7.14834 7.58579 7.48413 8 7.48413C8.41421 7.48413 8.75 7.14834 8.75 6.73413H7.25ZM12 3.48413C13.7949 3.48413 15.25 4.93921 15.25 6.73413H16.75C16.75 4.11078 14.6234 1.98413 12 1.98413V3.48413ZM12 1.98413C9.37665 1.98413 7.25 4.11078 7.25 6.73413H8.75C8.75 4.93921 10.2051 3.48413 12 3.48413V1.98413Z"
            fill="#fff"
          />
          <path
            d="M3.562 18.238L4.3062 18.331L3.562 18.238ZM20.438 18.238L19.6938 18.331L20.438 18.238ZM19.438 10.238L20.1822 10.145V10.145L19.438 10.238ZM4.562 10.238L3.81779 10.145L4.562 10.238ZM8.53111 7.48413H15.4688V5.98413H8.53111V7.48413ZM18.6938 10.331L19.6938 18.331L21.1822 18.145L20.1822 10.145L18.6938 10.331ZM16.4688 21.9841H7.53111V23.4841H16.4688V21.9841ZM4.3062 18.331L5.3062 10.331L3.81779 10.145L2.81779 18.145L4.3062 18.331ZM7.53111 21.9841C5.57624 21.9841 4.06373 20.2708 4.3062 18.331L2.81779 18.145C2.46341 20.98 4.67399 23.4841 7.53111 23.4841V21.9841ZM19.6938 18.331C19.9362 20.2708 18.4237 21.9841 16.4688 21.9841V23.4841C19.326 23.4841 21.5366 20.98 21.1822 18.145L19.6938 18.331ZM15.4688 7.48413C17.1079 7.48413 18.4905 8.70462 18.6938 10.331L20.1822 10.145C19.885 7.76793 17.8644 5.98413 15.4688 5.98413V7.48413ZM8.53111 5.98413C6.13557 5.98413 4.11492 7.76793 3.81779 10.145L5.3062 10.331C5.5095 8.70462 6.89206 7.48413 8.53111 7.48413V5.98413Z"
            fill="#fff"
          />
          <path
            d="M9 13.9841C8.58579 13.9841 8.25 14.3199 8.25 14.7341C8.25 15.1483 8.58579 15.4841 9 15.4841V13.9841ZM15 15.4841C15.4142 15.4841 15.75 15.1483 15.75 14.7341C15.75 14.3199 15.4142 13.9841 15 13.9841V15.4841ZM9 15.4841H15V13.9841H9V15.4841Z"
            fill="#fff"
          />
          <path
            d="M12.75 11.7341C12.75 11.3199 12.4142 10.9841 12 10.9841C11.5858 10.9841 11.25 11.3199 11.25 11.7341L12.75 11.7341ZM11.25 17.7341C11.25 18.1483 11.5858 18.4841 12 18.4841C12.4142 18.4841 12.75 18.1483 12.75 17.7341H11.25ZM11.25 11.7341L11.25 17.7341H12.75L12.75 11.7341L11.25 11.7341Z"
            fill="#fff"
          />
        </svg>
      </div>
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: fit-content;

  &:hover {
    svg {
      transition: all 500ms ease-in;
      path {
        transition: all 500ms ease-in;
        fill: #fff;
      }
    }
  }
`;

export default AddToCart;
