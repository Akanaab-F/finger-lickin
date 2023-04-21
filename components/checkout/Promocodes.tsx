import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import { RootState, useAppDispatch, useAppSelector } from "../../store";

import { IPromocodes } from "../../types";
import {
  applyDiscount,
  calcCartAmount,
  resetDiscount,
} from "../../store/slices/cartSlice";
import { setAlert } from "../../store/slices/alertsSlice";
import { getPromoCode } from "../../services";

const PromoApplied: React.FC<
  Pick<IPromocodes, "code" | "percentage" | "amount">
> = ({ code, percentage, amount }) => {
  const dispatch = useAppDispatch();

  const handleRemovePromocode = useCallback(() => {
    dispatch(resetDiscount());
    dispatch(calcCartAmount());
  }, [dispatch]);

  return (
    <StyledPromoApplied className="cursor-pointer w-[22rem] py-2 text-green-700 border border-green-700 rounded-xl bg-white flex justify-between px-6 items-center transition-all duration-500">
      <div className="flex items-center justify-evenly basis-3/4 gap-x-2">
        <div>
          <svg
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5954 8.16446C14.8143 8.94551 13.548 8.94551 12.7669 8.16446C11.9859 7.38341 11.9859 6.11708 12.7669 5.33603C13.548 4.55498 14.8143 4.55498 15.5954 5.33603C16.3764 6.11708 16.3764 7.38341 15.5954 8.16446Z"
              stroke="#198754"
              strokeWidth="1.5"
            />
            <path
              d="M8.76422 2.26772C9.60114 1.4308 10.7571 0.996477 11.9286 1.07873L15.893 1.35705C17.8724 1.49602 19.4354 3.05902 19.5744 5.03848L19.8527 9.0028C19.935 10.1744 19.5006 11.3303 18.6637 12.1672L12.0984 18.7326C10.515 20.3159 7.96514 20.3331 6.40304 18.771L2.1604 14.5284C0.598303 12.9663 0.615523 10.4164 2.19886 8.83308L8.76422 2.26772Z"
              stroke="#198754"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col items-start justify-around">
          <h3 className="font-boldFont text-lg">{code.toUpperCase()}</h3>
          <span className="font-regularFont text-base text-green-700/50">
            {percentage > 0
              ? `${percentage * 100}% Promo code applied!`
              : `GHC${amount} Promo code applided!`}
          </span>
        </div>
      </div>
      <div
        onClick={handleRemovePromocode}
        className="remove flex items-center justify-center basis-10 cursor-pointer text-green-700/40 transition-all duration-300"
      >
        remove
      </div>
    </StyledPromoApplied>
  );
};

const PromoInput: React.FC<{
  setPromo: Dispatch<SetStateAction<string>>;
  promo: string;
  disabled: boolean;
  handleSubmitPromo: () => void;
}> = ({ setPromo, handleSubmitPromo, promo, disabled }) => {
  return (
    <div className="flex justify-center items-center w-full h-full basis-1/2">
      <input
        value={promo}
        onChange={(e) => setPromo(e.target.value.toUpperCase())}
        placeholder="Enter promocode/coupon"
        className="p-5 w-full placeholder:font-regularFont h-[6.25rem] sm:h-[5rem] font-boldFont text-xl placeholder:text-text200 uppercase placeholder:capitalize border-transparent focus:border-primary400 text-text400 rounded-bl-md rounded-tl-md transition-all duration-500"
      />
      <div className="grow flex items-center justify-center h-[6.25rem] sm:h-[5rem]">
        <div
          onClick={handleSubmitPromo}
          className={
            (disabled
              ? "bg-primary400/50 pointer-events-none"
              : "bg-primary400 cursor-pointer") +
            " flex items-center justify-around h-full uppercase text-white font-mediumFont text-2xl px-5 py-5 rounded-tr-md rounded-br-md"
          }
        >
          <div>
            <svg
              width="1.8rem"
              height="1.8rem"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1141 9.92106C11.1141 10.58 10.58 11.1141 9.92106 11.1141C9.26217 11.1141 8.72803 10.58 8.72803 9.92106C8.72803 9.26217 9.26217 8.72803 9.92106 8.72803C10.58 8.72803 11.1141 9.26217 11.1141 9.92106Z"
                fill="#FEFAFB"
              />
              <path
                d="M18.2718 17.0793C18.2718 17.7382 17.7377 18.2723 17.0788 18.2723C16.4199 18.2723 15.8857 17.7382 15.8857 17.0793C15.8857 16.4204 16.4199 15.8862 17.0788 15.8862C17.7377 15.8862 18.2718 16.4204 18.2718 17.0793Z"
                fill="#FEFAFB"
              />
              <path
                d="M11.1785 2.35499C12.5163 1.215 14.4837 1.215 15.8215 2.35499L16.6358 3.049C17.2091 3.53752 17.9218 3.83274 18.6726 3.89265L19.7392 3.97777C21.4912 4.11758 22.8824 5.50881 23.0222 7.26081L23.1073 8.3274C23.1673 9.07818 23.4625 9.79092 23.951 10.3642L24.645 11.1785C25.785 12.5163 25.785 14.4837 24.645 15.8215L23.951 16.6358C23.4625 17.2091 23.1673 17.9218 23.1073 18.6726L23.0222 19.7392C22.8824 21.4912 21.4912 22.8824 19.7392 23.0222L18.6726 23.1073C17.9218 23.1673 17.2091 23.4625 16.6358 23.951L15.8215 24.645C14.4837 25.785 12.5162 25.785 11.1785 24.645L10.3642 23.951C9.79092 23.4625 9.07818 23.1673 8.3274 23.1073L7.26081 23.0222C5.50881 22.8824 4.11758 21.4912 3.97777 19.7392L3.89265 18.6726C3.83274 17.9218 3.53752 17.2091 3.049 16.6358L2.35499 15.8215C1.215 14.4837 1.215 12.5163 2.35499 11.1785L3.049 10.3642C3.53751 9.79092 3.83274 9.07818 3.89265 8.32741L3.97777 7.26081C4.11758 5.50881 5.50881 4.11758 7.26081 3.97777L8.3274 3.89265C9.07818 3.83274 9.79092 3.53752 10.3642 3.049L11.1785 2.35499Z"
                stroke="#FEFAFB"
                strokeWidth="1.5"
              />
              <path
                d="M9.9209 17.0793L17.0791 9.92114"
                stroke="#FEFAFB"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span>apply</span>
        </div>
      </div>
    </div>
  );
};

const Promocodes = () => {
  const dispatch = useAppDispatch();

  const [promo, setPromo] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const appliedPromos = useAppSelector(
    (state: RootState) => state.cart.discount
  );

  const handleSubmitPromo = useCallback(() => {
    setDisabled(true);
    getPromoCode(promo)
      .then(({ data }: { data: IPromocodes }) => {
        dispatch(applyDiscount(data));
        dispatch(calcCartAmount());

        dispatch(
          setAlert({
            message: "Promo code applied successfully!",
            type: "success",
          })
        );
      })
      .catch(({ response }) => {
        const { detail } = response.data;
        setError(detail);
      })
      .finally(() => setDisabled(false));

    setPromo("");
  }, [dispatch, promo]);

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  return (
    <div className="w-full h-[18.25rem] px-12 lg:px-5 tablet:px-5 py-3 flex flex-col">
      <h3 className="flex items-center basis-1/3 capitalize font-boldFont text-3xl text-white">
        promocode/coupon
      </h3>
      <PromoInput
        promo={promo}
        setPromo={setPromo}
        handleSubmitPromo={handleSubmitPromo}
        disabled={disabled}
      />
      <div className="flex items-center w-full basis-10">
        <span className="ml-4 text-sm font-bold text-red-500">
          {error.length > 0 && error}
        </span>
      </div>
      <div className="max-w-full w-full flex items-center basis-1/3">
        {!!appliedPromos.code && appliedPromos.code && (
          <PromoApplied
            percentage={appliedPromos.code.percentage}
            amount={appliedPromos.code.amount}
            code={appliedPromos.code.code}
            key={v4()}
          />
        )}
      </div>
    </div>
  );
};

export default Promocodes;

const StyledPromoApplied = styled.div`
  overflow: hidden;

  .remove {
    opacity: 0;
    transform: translateX(100%);
  }

  &:hover .remove {
    opacity: 1;
    transform: translateX(0);
  }
`;
