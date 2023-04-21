import axios from "axios";

export const getStews = async (): Promise<any> =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/stews`);
