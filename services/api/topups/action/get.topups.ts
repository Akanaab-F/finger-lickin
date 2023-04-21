import axios from "axios";

export const getTopups = async (): Promise<any> =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/topups`);
