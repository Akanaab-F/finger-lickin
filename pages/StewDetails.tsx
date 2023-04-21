import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { IStew, ITopup } from "../types";
import { getStewById } from "../services";

import HeaderCard from "../components/header/HeaderCard";
import Price from "../components/Price";
import TopupCard from "../components/TopupCard";
import AddToCart from "../components/buttons/AddToCart";
import QuantityController from "../components/buttons/QuantityController";
import { filter, get, some } from "lodash";
import SkeletonLoading from "../components/loaders/SkeletonLoading";
import {
  addToCart,
  topupToCart,
  calcCartAmount,
} from "../store/slices/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { calcOrderAndTopups } from "../helpers";

const StewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderItems = useAppSelector(
    (state: RootState) => state.cart.orderItems
  );
  const stewOrderItem = filter(orderItems, ["id", id])[0];

  const [stew, setStew] = useState<IStew>();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(!!stewOrderItem);
  const [selectedTopups, setSelectedTopups] = useState<ITopup[]>(
    stewOrderItem?.topups ?? []
  );

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  let handleStewTopups = useCallback(
    (data: ITopup) => {
      if (some(orderItems, ["id", id])) {
        if (some(stewOrderItem.topups, ["id", data.id])) {
          dispatch(
            topupToCart({ type: "remove", id: id as string, topups: [data] })
          );
        } else {
          dispatch(
            topupToCart({ type: "add", id: id as string, topups: [data] })
          );
        }
      }
      if (some(selectedTopups, ["id", data.id])) {
        setSelectedTopups(filter(selectedTopups, (o) => o.id !== data.id));
      } else {
        setSelectedTopups([...selectedTopups, data]);
      }

      dispatch(calcCartAmount());
    },
    [dispatch, id, orderItems, selectedTopups, stewOrderItem]
  );

  const handleNewAddToCart = useCallback(() => {
    if (stew) {
      let { id, name, price, image } = stew;
      dispatch(
        addToCart({
          id,
          name,
          image,
          price,
          quantity,
          topups: selectedTopups,
        })
      );
      dispatch(calcCartAmount());
    }
  }, [dispatch, quantity, stew, selectedTopups]);

  useEffect(() => {
    getStewById(id as string).then(({ data }: { data: IStew }) => {
      setStew(data);
    });
  }, [id, orderItems]);

  useEffect(() => {
    if (some(orderItems, ["id", id])) return;

    setSelectedTopups([]);
    setAddedToCart(!!stewOrderItem);
  }, [orderItems, id, stewOrderItem]);

  return (
    <StyledMain>
      <section className="w-4/5 mx-auto mt-10 md:ml-20 tablet:ml-10 md:sticky top-10 left-0 z-30">
        <button
          className="w-auto flex justify-evenly items-center rounded-lg border border-primary500 text-primary500 py-3 px-4 font-mediumFont text-2xl md:bg-white"
          onClick={handleGoBack}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 8L6 12M6 12L10 16M6 12L18 12"
              stroke="#F6523B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="pl-4 tablet:hidden">Go back</div>
        </button>
      </section>
      {stew ? (
        <section className="w-4/5 mx-auto mb-10 md:w-[90%]">
          <section className="flex tablet:flex-col tablet:h-[50rem]">
            <div className="basis-1/2 flex flex-col justify-evenly tablet:order-1">
              <h2 className="font-boldFont text-6xl text-primary500 capitalize tablet:text-center tablet:mx-auto">
                {stew.name}
              </h2>
              <div className="text-text300 text-xl w-4/5 tablet:text-center tablet:mx-auto tablet:text-2xl">
                {stew.description}
              </div>
            </div>
            <div className="grow flex justify-center items-center tablet:order-0">
              <img
                className="rounded-full w-[28.125rem] h-[25rem] object-cover"
                src={stew.image}
                alt={`${stew.name} imagery`}
              />
            </div>
          </section>
          <StyledPriceSection className="flex sm:flex-col sm:gap-5 justify-between items-center w-2/5 tablet:w-3/4 tablet:mx-auto tablet:text-xl ">
            <div className="basis-[55%] capitalize">
              default topping: &nbsp;
              <span className="text-primary400">
                {get(stew, "default_topup", "No topping")}
              </span>
            </div>
            <div className="grow tablet:w-2/3">
              <Price price={stew.price} />
            </div>
          </StyledPriceSection>
          <div className="my-16 tablet:text-2xl">
            <div>
              <div className="flex sm:flex-col sm:gap-5 sm:items-center w-1/2 xl:w-3/4 tablet:w-4/5 tablet:mx-auto sm:w-[90%]">
                <HeaderCard type="secondary" title="toppings (extras)" />
                <div className="flex items-center w-1/2 ml-10 tablet:text-center tablet:m-0 tablet:w-3/4">
                  Add extras to your stews to get that extra taste nutrients you
                  need
                </div>
              </div>
              <div className="grid grid-cols-3 gap-14 my-10 tablet:grid-cols-2 tablet:mx-16 sm:mx-10  sm:grid-cols-1 sm:auto-rows-auto">
                {stew.topups.length > 0 ? (
                  stew.topups.map((s) => (
                    <div
                      className="w-full h-full flex items-center pl-14 sm:px-5 sm:mx-auto sm:w-1/2 tablet:flex tablet:justify-center tablet:items-center"
                      key={s.id}
                    >
                      <TopupCard
                        stewId={id as string}
                        setter={handleStewTopups}
                        name={s.name}
                        price={s.price}
                        id={s.id}
                        checked={selectedTopups.some((top) => top.id === s.id)}
                      />
                    </div>
                  ))
                ) : (
                  <StyledNoTopups className="flex justify-center items-center text-xl font-regularFont w-full tablet:text-2xl tablet:x">
                    No topups for this item
                  </StyledNoTopups>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16 tablet:grid-rows-2 tablet:grid-cols-none sm:grid-cols-1 sm:auto-rows-auto">
              <div className="flex flex-col sm:items-center justify-evenly tablet:w-5/6 tablet:mx-auto">
                <HeaderCard type="secondary" title="allergies" />
                <StyledTextArea
                  className="sm:h-[6em] sm:w-[24em] rounded-md border border-text100 p-4 my-8 text-text300 focus:-translate-y-2 transition-all duration-300 focus:shadow-lg focus:shadow-primary300/30 focus:border-primary300/40 focus:placeholder:text-primary300/80"
                  cols={40}
                  rows={8}
                  placeholder="Let us know what you don't like..."
                />
              </div>
              <div className="flex flex-col sm:items-center justify-evenly tablet:w-5/6 tablet:mx-auto">
                <HeaderCard type="secondary" title="additional notes" />
                <StyledTextArea
                  className="sm:h-[6em] sm:w-[24em] rounded-md border border-text100 p-4 my-8 text-text300 focus:-translate-y-2 transition-all duration-300 focus:shadow-lg focus:shadow-primary300/30 focus:border-primary300/40 focus:placeholder:text-primary300/80"
                  cols={40}
                  rows={8}
                  placeholder="Add anything you want us to notice..."
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center md:fixed bottom-5 left-0 z-30 md:w-full xl:w-3/5 xl:mx-auto">
              <div className="w-2/5 flex justify-evenly items-center lg:w-3/5 sm:w-[90%] xl:w-full">
                <div className="uppercase text-primary400 font-boldFont text-lg tablet:text-3xl">
                  ghc
                  {calcOrderAndTopups(
                    stew.price,
                    stewOrderItem?.quantity ?? quantity,
                    selectedTopups
                  )}
                </div>
                <AddToCart
                  addToCart={handleNewAddToCart}
                  addedToCart={addedToCart}
                  setter={setAddedToCart}
                />
                <QuantityController
                  quantity={stewOrderItem?.quantity ?? quantity}
                  where="page"
                  id={id as string}
                  setter={setQuantity}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SkeletonLoading where="stew" />
      )}
    </StyledMain>
  );
};

const StyledTextArea = styled.textarea`
  &:link,
  &:active,
  &:focus {
    outline: 0;
  }
`;

const StyledMain = styled.main`
  @media only screen and (min-width: 120em) {
    width: 1920px !important;
    margin: 0 auto;
  }
`;

const StyledPriceSection = styled.div`
  @media only screen and (max-width: 73.75em) and (min-width: 49em) {
    margin: 0 2rem;
    width: 50%;
  }
`;

const StyledNoTopups = styled.div`
  grid-column: 1 /-1;
`;

export default StewDetails;
