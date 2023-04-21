export * from "./checkout";
export * from "./components";
export * from "./promocode";

export type Status = "pending" | "completed" | "cancelled";

export type UserTypes = "student" | "public";

export type StatesTypes = "notfound" | "cart" | "tracking";

export type Type = "primary" | "secondary";

export type deliveryDays = "tuesday" | "saturday";

export type localData = "trackingIDs" | "formData";
