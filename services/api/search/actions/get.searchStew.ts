import axios from "axios";

export const searchFilter = async (
  searchName: string,
  topups: string[]
): Promise<any> =>
  axios.get(
    `${
      process.env.REACT_APP_BASE_URL
    }/stews/?name=${searchName}&topups=${topups.join(",")}`
  );
