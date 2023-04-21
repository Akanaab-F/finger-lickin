import React, { useCallback, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  addDataToLocalStorage,
  checkCartItemsQuantity,
  checkPromocodeRequirement,
  checkoutUsers,
  convertOrderItems,
  getDataFromLocalStorage,
  initialFormData,
  setDeliveryDate,
} from "../../helpers";
import ErrorHandler from "../../helpers/functions/Errors/ErrorHandler";
import { MakePayment, createOrder } from "../../services";
import { resetCart } from "../../store/slices/cartSlice";
import { toggleCheckoutModal } from "../../store/slices/checkoutSlice";
import { ICheckoutUser, IOrderProps, UserTypes } from "../../types";

import Tabs from "./Tabs";
import Inputs from "../forms/Inputs";
import Promocodes from "./Promocodes";
import OrderSummaryItem from "./OrderSummaryItem";
import CheckoutSummary from "./CheckoutSummary";
import States from "../States";
import { setAlert } from "../../store/slices/alertsSlice";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);
  const discount = useAppSelector((state: RootState) => state.cart.discount);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [hallName, setHallName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<ICheckoutUser>(
    checkoutUsers[0]
  );

  const handleSetEmptyState = useCallback((type: UserTypes) => {
    if (type === "student") {
      setAddress("");
      setCity("");
    } else {
      setHallName("");
      setRoomNumber("");
    }
  }, []);

  const [loading, setLoading] = useState(false);

  const handleCloseModal = useCallback(() => {
    const data: Omit<
      IOrderProps,
      "delivery_date" | "order_items" | "discount"
    > = {
      user_data: { full_name: fullName, email, phone_number: phoneNumber },
      student_location_data: { hall_name: hallName, room_number: roomNumber },
      public_location_data: { address, city },
    };

    addDataToLocalStorage("formData", data);
    dispatch(toggleCheckoutModal());
  }, [
    dispatch,
    fullName,
    email,
    hallName,
    roomNumber,
    phoneNumber,
    address,
    city,
  ]);

  const initalizePayment = MakePayment(email, cart.total);

  const handleOrderSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      let promoRequirementPass: { status: boolean; message: string };

      e.preventDefault();
      setLoading(true);

      const order: IOrderProps = {
        user_data: { full_name: fullName, email, phone_number: phoneNumber },
        student_location_data:
          !!hallName && !!roomNumber
            ? { hall_name: hallName, room_number: roomNumber }
            : null,
        public_location_data: !!address && !!city ? { address, city } : null,
        order_items: convertOrderItems(cart.orderItems),
        delivery_date: setDeliveryDate(),
        discount: cart.discount.code ? cart.discount.code.code : null,
      };

      // check if promocode exists and check if it meets requirements else set status to true
      promoRequirementPass = discount.code
        ? checkPromocodeRequirement(
            checkCartItemsQuantity(cart.orderItems),
            selectedUser.type,
            discount.code
          )
        : { status: true, message: "" };

      //check if it passes then initialize payment else dispatch error to user
      if (promoRequirementPass.status) {
        initalizePayment(
          () => {
            //successfull payment triggers creating a new order
            dispatch(createOrder(order));
            dispatch(resetCart());

            //set the loading state to false
            setLoading(false);

            //empty the form checkout fields
            setFullName("");
            setPhoneNumber("");
            setEmail("");
            setHallName("");
            setRoomNumber("");

            //set local storage data to null
            addDataToLocalStorage("formData", null);
          },
          () => {
            setLoading(false);
            dispatch(ErrorHandler("500", "failed_payment"));
          }
        );
      } else {
        dispatch(
          setAlert({
            type: "warning",
            message: promoRequirementPass.message,
          })
        );
        setLoading(false);
      }
    },
    [
      cart.orderItems,
      fullName,
      phoneNumber,
      hallName,
      roomNumber,
      email,
      initalizePayment,
      address,
      city,
      dispatch,
      cart.discount,
      discount.code,
      selectedUser.type,
    ]
  );

  useEffect(() => {
    const data:
      | Omit<IOrderProps, "delivery_date" | "order_items" | "discount">
      | string = JSON.parse(
      getDataFromLocalStorage("formData") ?? initialFormData
    );

    if (typeof data === "string" && data === "") {
      return;
    } else if (typeof data === "object") {
      const { public_location_data, student_location_data, user_data } = data;

      setFullName(user_data.full_name);
      setEmail(user_data.email);
      setPhoneNumber(user_data.phone_number);

      setHallName(student_location_data ? student_location_data.hall_name : "");
      setRoomNumber(
        student_location_data ? student_location_data.room_number : ""
      );

      setAddress(public_location_data ? public_location_data.address : "");
      setCity(public_location_data ? public_location_data.city : "");
    }
  }, []);

  return (
    <StyledCheck className="flex fixed top-0 left-0 w-[100vw] max-h-[100vh] h-[100vh] z-50 bg-background100 ">
      <div className="mt-10 tablet:mx-auto tablet:w-[90%] w-full">
        <div
          onClick={handleCloseModal}
          className="basis-full flex justify-center items-center fixed right-16 top-5 h-10 cursor-pointer"
        >
          <span className="capitalize sm:hidden">close</span>
          <div className="sm:bg-white sm:p-3 sm:rounded-md sm:shadow sm:shadow-primary300/20">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.657 1.34321L1.34326 12.6569M12.657 12.6569L1.34326 1.34314"
                stroke="#353435"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <StyledForm
          id="order-form"
          onSubmit={handleOrderSubmit}
          className="grid mb-20 my-10 w-2/3 xl:w-full xl:px-6 gap-y-5 mx-auto tablet:grid-cols-none grid-cols-[60%_40%]"
        >
          <div>
            <div className="flex justify-center items-center">
              <Tabs
                users={checkoutUsers}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                handleSetEmptyState={handleSetEmptyState}
              />
            </div>
            <section className="grid px-10 xxxs:gap-y-3">
              <div className="flex flex-col">
                <h4 className="basis-8 font-regularFont text-base capitalize text-slate-900 ml-5">
                  checkout information
                </h4>
                <section className="grow bg-white p-5 flex flex-col justify-between gap-y-10">
                  <div className="grid sm:gap-y-3 tablet:gap-y-5 grid-cols-2 gap-2 tablet:grid-cols-none">
                    <div>
                      <Inputs
                        type="text"
                        label="Full name"
                        placeholder="eg. firstname lastname"
                        setter={setFullName}
                        required={true}
                        value={fullName}
                      />
                    </div>
                    <div>
                      <Inputs
                        type="email"
                        label="Email address (for receipts)"
                        placeholder="eg. abc@efg.ujk"
                        setter={setEmail}
                        required={true}
                        value={email}
                      />
                    </div>
                    <div>
                      <Inputs
                        type="tel"
                        label="Phone number (calling line)"
                        placeholder="eg. 02000000000"
                        setter={setPhoneNumber}
                        required={true}
                        pattern="[0-9]+"
                        max={10}
                        min={10}
                        value={phoneNumber}
                      />
                    </div>
                  </div>
                  {selectedUser.type === "student" ? (
                    <div className="grid sm:gap-y-3 tablet:gap-y-5 grid-cols-2 gap-2 tablet:grid-cols-none">
                      <div>
                        <Inputs
                          type="text"
                          label="Hall of residence"
                          placeholder="eg. Pent Block C"
                          setter={setHallName}
                          required={true}
                          value={hallName}
                        />
                      </div>
                      <div>
                        <Inputs
                          type="text"
                          label="Room number"
                          placeholder="eg. E30"
                          setter={setRoomNumber}
                          required={true}
                          value={roomNumber}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:gap-y-3 tablet:gap-y-5 grid-cols-2 gap-2 tablet:grid-cols-none">
                      <div>
                        <Inputs
                          type="text"
                          label="Address"
                          placeholder="eg. 22 Amankani Avenue"
                          setter={setAddress}
                          required={true}
                          value={address}
                        />
                      </div>
                      <div>
                        <Inputs
                          type="text"
                          label="City"
                          placeholder="eg. Adenta"
                          setter={setCity}
                          required={true}
                          value={city}
                        />
                      </div>
                    </div>
                  )}
                </section>
              </div>
              <StyledPromo className="flex justify-center items-center bg-blue-200 rounded-md">
                <Promocodes />
              </StyledPromo>
            </section>
          </div>
          {cart.orderItems.length > 0 ? (
            <StyledOrderSummary className="flex flex-col xxxs:px-3 xs:px-12 sm:px-12 tablet:px-16">
              <h4 className="font-regularFont text-base capitalize text-slate-900  basis-8">
                Order Summary
              </h4>
              <section className="grow grid sm:grid-rows-[1fr_18rem] tablet:grid-rows-[1fr_23rem] sm:gap-y-3 tablet:gap-y-5">
                <StyledOrderItems className="flex flex-col">
                  <div className="flex flex-col gap-y-2">
                    {cart.orderItems.map(
                      ({ id, name, price, image, quantity, topups }) => (
                        <OrderSummaryItem
                          key={id}
                          id={id}
                          image={image}
                          price={price}
                          name={name}
                          quantity={quantity}
                          topups={topups}
                        />
                      )
                    )}
                  </div>
                </StyledOrderItems>
                <div className="grid bg-white">
                  <div className="grow grid gap-y-2">
                    <div className="flex justify-around items-center flex-col border-t-2 border-b-2">
                      <CheckoutSummary title="subtotal" value={cart.subtotal} />
                      <CheckoutSummary
                        title="discount"
                        value={cart.discount.amountDeducted}
                      />
                    </div>
                    <div className="flex justify-center items-center border-t-2 border-b-2">
                      <CheckoutSummary title="total" value={cart.total} />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="text-base text-text200 tablet:text-xl">
                      Order will be delivered on &nbsp;
                      <span className="text-primary400 capitalize">
                        {setDeliveryDate()}
                      </span>
                    </span>
                  </div>
                  <div className="basis-1/4 flex justify-center items-end px-10">
                    <button
                      type="submit"
                      className="bg-primary400 text-white font-mediumFont text-2xl w-full py-5 rounded-md flex items-center justify-evenly px-10"
                    >
                      {loading ? (
                        <svg
                          className="animate-spin"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#fff"
                        >
                          <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
                        </svg>
                      ) : (
                        `Pay GHC ${cart.total}`
                      )}
                    </button>
                  </div>
                </div>
              </section>
            </StyledOrderSummary>
          ) : (
            <div className="tablet:-order-1 order-1 mx-auto w-[28rem] xs:w-[30rem] h-fit flex flex-col justify-around items-center gap-y-5 sm:mx-auto">
              <States type="cart" />
              <div className="flex flex-col items-center justify-between h-1/6 gap-y-5">
                <h2 className="font-mediumFont text-2xl text-primary400 tablet:text-3xl">
                  Empty cart
                </h2>
                <div className="text-center text-slate-400 px-8">
                  Please go back and add something delicious here, we are
                  waiting!
                </div>
                <Link
                  onClick={handleCloseModal}
                  className="font-mediumFont text-lg tablet:text-xl text-primary300 hover:bg-primary300 hover:text-white transition-colors duration-200 capitalize px-4 py-1 rounded-full border border-primary300"
                  to="/menu"
                >
                  view menu
                </Link>
              </div>
            </div>
          )}
        </StyledForm>
      </div>
    </StyledCheck>
  );
};

export default Checkout;

const StyledCheck = styled.section`
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledForm = styled.form`
  @media screen and (min-width: 120em) {
    width: 1080px !important;
    margin: 0 auto;
  }
`;

const StyledPromo = styled.section``;

const StyledOrderSummary = styled.section``;

const StyledOrderItems = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;
