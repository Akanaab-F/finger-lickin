import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RootState, useAppSelector } from "../store";
import useHandleCheckOrder from "../hooks/useHandleCheckOrder";

import { IOrderResponse } from "../types";
import { getBannerText, getDataFromLocalStorage } from "../helpers";

import HeaderBanner from "../components/header/HeaderBanner";
import Search from "../components/forms/Search";
import OrderDetails from "../components/OrderDetails";
import States from "../components/States";
import { filter, some } from "lodash";

const TrackOrder = () => {
  const { pathname } = useLocation();
  
  const [search, setSearch] = useState("");
  const tracking = useAppSelector((state: RootState) => state.tracking);
  const [orderDetails, setOrderDetails] = useState<IOrderResponse>();
  const [trackingHistory, setTrackingHistory] = useState<string[]>(
    JSON.parse(getDataFromLocalStorage("trackingIDs") ?? "[]")
  );

  const [checker] = useHandleCheckOrder(setTrackingHistory);

  const handleOrderDetails = useCallback(() => {
    if (some(tracking, ["tracking_id", search])) {
      return setOrderDetails(filter(tracking, ["tracking_id", search])[0]);
    }
  }, [search, tracking]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleOrderDetails();
      checker(search);
    },
    [search, checker, handleOrderDetails]
  );

  useEffect(() => {
    const trackingIDs = getDataFromLocalStorage("trackingIDs");
    setTrackingHistory(JSON.parse(trackingIDs ?? "[]"));
  }, []);

  useEffect(() => {
    if (search.length < 8) return;
    handleOrderDetails();
  }, [search, checker, handleOrderDetails]);

  return (
    <main>
      <HeaderBanner text={getBannerText(pathname)} />
      <Search
        formHandler={handleSearchSubmit}
        setter={setSearch}
        placeholder="Enter your tracking ID"
        options={trackingHistory}
        optionsSetter={setTrackingHistory}
      />
      <div className="mx-auto flex justify-center items-center w-3/4 my-10">
        {orderDetails ? (
          <OrderDetails
            tracking_id={orderDetails.tracking_id}
            user_data={orderDetails.user_data}
            delivery_date={orderDetails.delivery_date}
            status={orderDetails.status}
            student_location_data={orderDetails.student_location_data}
            public_location_data={orderDetails.public_location_data}
            total={orderDetails.total}
            order_items={orderDetails.order_items}
          />
        ) : (
          <div className="flex flex-col items-center justify-evenly h-[30rem]">
            <States type="tracking" />
            <div className="flex flex-col items-center justify-between">
              <h2 className="font-mediumFont text-2xl text-primary400">
                Enter your tracking information
              </h2>
              <div className="text-center text-slate-400 px-8 mt-3 w-4/5">
                Please submit your tracking id in the input above to get your
                tracking information.
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackOrder;
