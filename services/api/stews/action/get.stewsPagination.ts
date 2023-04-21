import axios from "axios";

export const getStewsPagination = async (
  offset: number,
  limit: number
): Promise<any> =>
  axios.get(
    `${process.env.REACT_APP_BASE_URL}/stews?limit=${limit}&offset=${offset}`
  );
