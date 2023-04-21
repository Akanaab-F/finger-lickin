import axios from "axios";
import {
  arkeselBaseURL,
  balanceCheckEndpoint,
  sendSMSEndpoint,
  isSMSBalanceLow,
  senderID,
  adminRecipients,
  createLowLimtMessage,
} from "../../helpers";
import { AppDispatch } from "../../store";
import ErrorHandler from "../../helpers/functions/Errors/ErrorHandler";
import { setAlert } from "../../store/slices/alertsSlice";
import { toNumber } from "lodash";

const api_key = process.env.REACT_APP_ARKESEL_API_KEY;

export const sendSMS =
  (recipients: string[], message: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    const data = {
      sender: senderID,
      message,
      recipients,
    };

    const config = {
      method: "post",
      url: `${arkeselBaseURL}${sendSMSEndpoint}`,
      headers: {
        "api-key": api_key,
      },
      data,
    };

    dispatch(checkSMS());

    if (recipients.length <= 1) {
      await axios(config)
        .then(() => {
          dispatch(
            setAlert({
              type: "success",
              message: "Order tracking id sent successfully!",
            })
          );
        })
        .catch(({ code, message }) => {
          dispatch(ErrorHandler(code, message));
        });
    }
  };

export const checkSMS =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    const config = {
      method: "get",
      url: `${arkeselBaseURL}${balanceCheckEndpoint}`,
      headers: {
        "api-key": api_key,
      },
    };

    await axios(config)
      .then(({ data }) => {
        const { sms_balance } = data.data;
        isSMSBalanceLow(toNumber(sms_balance)) &&
          dispatch(sendSMS(adminRecipients, createLowLimtMessage(sms_balance)));
      })
      .catch(({ code, message }) => dispatch(ErrorHandler(code, message)));
  };
