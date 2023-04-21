import axios from "axios";
import { AppDispatch } from "../../../../store";
import { IOrderProps } from "../../../../types";
import { setAlert } from "../../../../store/slices/alertsSlice";
import { sendSMS } from "../../../sms";
import { createRecipientsArray, createUserMessage, setDeliveryDate } from "../../../../helpers";
import ErrorHandler from "../../../../helpers/functions/Errors/ErrorHandler";

export const createOrder =
  (order: IOrderProps) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const config = {
      url: `${process.env.REACT_APP_BASE_URL}/orders/create`,
      method: "post",
      data: order,
    };

    await axios(config)
      .then(({ data }) => {
        dispatch(
          setAlert({ type: "success", message: "Order created successfully!" })
        );
        const { tracking_id } = data;
        const [firstname] = order.user_data.full_name.split(" ");

        dispatch(
          sendSMS(
            createRecipientsArray(order.user_data.phone_number),
            createUserMessage(firstname, tracking_id, setDeliveryDate())
          )
        );
      })
      .catch(({ code, message }) => {
        dispatch(ErrorHandler(code, message));
      });
  };
