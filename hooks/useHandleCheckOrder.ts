import { checkOrder } from "../services";
import { IOrderResponse } from "../types";
import { addDataToLocalStorage, getDataFromLocalStorage } from "../helpers";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import ErrorHandler from "../helpers/functions/Errors/ErrorHandler";
import { setAlert } from "../store/slices/alertsSlice";
import { addTrackingDetails } from "../store/slices/trackingSlice";
import { some } from "lodash";

const useHandleCheckOrder = (
  trackingState: Function | null = null
): [Function] => {
  const dispatch = useAppDispatch();
  const tracking = useAppSelector((state: RootState) => state.tracking);

  const checker = (arg: string) =>
    !some(tracking, (track) => track.tracking_id.includes(arg)) &&
    checkOrder(arg)
      .then(({ data }: { data: IOrderResponse }) => {
        addDataToLocalStorage("trackingIDs", arg);

        const storedData = getDataFromLocalStorage("trackingIDs") ?? "[]";

        trackingState && trackingState(JSON.parse(storedData));

        dispatch(addTrackingDetails(data));
        dispatch(
          setAlert({
            type: "success",
            message: "Order info found successfully!",
          })
        );
      })
      .catch(({ response }) => {
        const { detail, status } = response.data;
        dispatch(ErrorHandler(status, detail));
      });

  return [checker];
};

export default useHandleCheckOrder;
