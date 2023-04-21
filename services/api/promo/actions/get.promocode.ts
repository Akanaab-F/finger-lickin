import axios from "axios";

export const getPromoCode = (code: string): Promise<any> =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/promocode/?code=${code}`);
