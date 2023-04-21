import { setAlert } from "../../../store/slices/alertsSlice";

const ErrorHandler = (code: string, message: string) => {
  const type = "error";

  if (code.toUpperCase() === "ERR_BAD_RESPONSE") {
    return setAlert({
      type,
      message: "Sorry, server request error, Try reloading!",
    });
  }

  switch (message.toUpperCase()) {
    case "ERR_INTERNET_DISCONNECTED":
      return setAlert({ type, message: "No internet connection!" });

    case "FAILED_PAYMENT":
      return setAlert({ type, message: "Payment failed, try again!" });

    case "INCORRECT TRACKING ID":
      return setAlert({ type, message: "Tracking ID not found, try again!" });

    default:
      return setAlert({ type, message: "Something went badly wrong!" });
  }
};
export default ErrorHandler;
