import { UserTypes } from "..";

export type PromoCondition = "greater" | "lesser";

export interface IPromoRequirements {
  order_count: {
    value: number;
    condition: PromoCondition;
  };
  individual: UserTypes;
}

export interface IPromocodes {
  code: string;
  requirements: IPromoRequirements;
  percentage: number;
  amount: number;
  status: "active" | "expired";
  expiration_date: string;
}
