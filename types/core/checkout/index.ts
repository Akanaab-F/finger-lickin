import { Status, deliveryDays, IStew, ITopup, UserTypes, IQuantityProps } from "..";

interface IResponse {
  count: number;
  next: null | string;
  previous: null | string;
}

export interface IResponseStew extends IResponse {
  results: IStew[];
}

export interface IOrderProps {
  user_data: {
    full_name: string;
    email: string;
    phone_number: string;
  };
  student_location_data: {
    hall_name: string;
    room_number: string;
  } | null;
  public_location_data: {
    address: string;
    city: string;
  } | null;
  order_items: IOrderRequestProps[];
  delivery_date: deliveryDays;
  discount: string | null;
}

export interface IOrderResponse
  extends Pick<
    IOrderProps,
    | "student_location_data"
    | "public_location_data"
    | "user_data"
    | "delivery_date"
  > {
  status: Status;
  total: number;
  tracking_id: string;
  order_items: {
    id: string;
    stew: IStew;
    subtotal: number;
    total: number;
    quantity: number;
    topups: ITopup[];
    additional_note?: string;
    allergies?: string;
  }[];
}

export interface ICheckoutUser {
  type: UserTypes;
  disabled: boolean;
  soon: boolean;
}

export interface ITrackingOrder
  extends Pick<
    IOrderProps,
    | "student_location_data"
    | "public_location_data"
    | "user_data"
    | "order_items"
  > {
  id: string;
  created_date: string;
  delivery_date: string;
  status: Status;
  tracking_id: string;
  total: number;
}

export interface IOrderRequestProps extends IQuantityProps {
  stew: Pick<IStew, "id">;
  topups: ITopup[];
  allergies?: string;
  additional_note?: string;
}
