import React from "react";
import { IOrderResponse } from "../types";

import { get } from "lodash";

const OrderDetails: React.FC<IOrderResponse> = ({
  tracking_id,
  order_items,
  status,
  user_data,
  student_location_data,
  public_location_data,
  total,
  delivery_date,
}) => {
  return (
    <div className="bg-white shadow-lg shadow-primary300/20 h-fit w-3/4 xl:w-[90%] grid grid-rows-[20%_80%] rounded-md p-5 gap-y-2">
      <div className="flex justify-between items-center font-boldFont text-3xl">
        <div>
          <h3>Tracking No #{tracking_id}</h3>
        </div>
        <div>
          <h3
            className={
              (status === "completed"
                ? "text-green-400"
                : status === "cancelled"
                ? "text-red-500"
                : "text-text300") + " capitalize"
            }
          >
            {status}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-none grid-rows-2 md:grid-rows-4 gap-10 ">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-mediumFont">Personal Information</h3>
          </div>
          <div className="text-text200">
            <div className="flex items-center justify-between">
              <span>Full name:</span>
              <span>{get(user_data, "full_name", "N/A")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Phone number:</span>
              <span>{get(user_data, "phone_number", "N/A")}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-mediumFont">Hall Information</h3>
          </div>
          {student_location_data ? (
            <div className="text-text200">
              <div className="flex items-center justify-between">
                <span>Hall name:</span>
                <span>{get(student_location_data, "hall_name", "N/A")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Room number:</span>
                <span>{get(student_location_data, "room_number", "N/A")}</span>
              </div>
            </div>
          ) : (
            <div className="text-text200">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <span>{get(public_location_data, "address", "N/A")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>City:</span>
                <span>{get(public_location_data, "city", "N/A")}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-mediumFont">Order Items</h3>
          </div>
          <div className="text-text200">
            {order_items.map(({ id, quantity, stew, total, topups }) => (
              <div className="mb-2" key={id}>
                <div className="grid grid-cols-[50%_25%_25%]">
                  <span>{get(stew, "name", "N/A")}</span>
                  <span className="capitalize">quantity: {quantity}</span>
                  <span className="text-right">GHC {total}</span>
                </div>
                {topups.length > 0 && (
                  <div className="flex">
                    <span className="basis-1/2">Topups:</span>
                    <div>
                      {topups.map(({ name, id }) => (
                        <span key={id}>{name} &nbsp;</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <div className="flex items-center justify-between text-text200">
            <span>Delivery date</span>
            <span className="capitalize">{delivery_date}</span>
          </div>
          <div className="flex justify-between items-center font-boldFont text-3xl">
            <h1 className="uppercase">total:</h1>
            <div>GHC {total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
