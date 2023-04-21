import axios from "axios";

export const getStewById = async (id: string): Promise<any> =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/stews/${id}`);
