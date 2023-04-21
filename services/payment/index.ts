import { usePaystackPayment } from "react-paystack";

export const MakePayment = (email: string, amount: number) => {
  let publicKey = process.env.REACT_APP_PAYSTACK_API_KEY as string;

  if (process.env.REACT_APP_STAGE === "staging") {
    publicKey = process.env.REACT_APP_PAYSTACK_TEST_API_KEY as string;
  }

  return usePaystackPayment({
    email,
    amount: amount * 100,
    publicKey,
    currency: "GHS",
  });
};
