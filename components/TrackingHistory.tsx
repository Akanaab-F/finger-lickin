import React from "react";
import { v4 } from "uuid";
import useHandleCheckOrder from "../hooks/useHandleCheckOrder";
import { resetDataInLocalStorage } from "../helpers";

const TrackingHistory: React.FC<{
  history: string[];
  setter: Function;
  optionsSetter?: Function;
}> = ({ history, setter, optionsSetter }) => {
  const [checker] = useHandleCheckOrder();

  const handleClickId = (id: string) => {
    checker(id);
    setter(id);
  };

  const handleResetIds = () => {
    resetDataInLocalStorage("trackingIDs");
    optionsSetter && optionsSetter([]);
  };
  return (
    <div className="w-2/4 mx-auto relative xl:w-3/4 lg:w-4/6 flex justify-between items-center top-3">
      <div className="flex gap-2 flex-wrap basis-[90%] xs:basis-[85%]">
        {history.map((his) => (
          <div
            onClick={() => handleClickId(his)}
            key={v4()}
            className="cursor-pointer border border-primary300/80 rounded-full px-2 py-1 text-primary300"
          >
            {his}
          </div>
        ))}
      </div>
      <div onClick={handleResetIds} className="cursor-pointer">
        clear all
      </div>
    </div>
  );
};

export default TrackingHistory;
