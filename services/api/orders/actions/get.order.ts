import axios from "axios";

export const checkOrder = async (trackingID: string): Promise<any> => {
  const config = {
    url: `${process.env.REACT_APP_BASE_URL}/orders/${trackingID}`,
    method: "get",
  };

  return await axios(config);
};
