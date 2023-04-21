import { filter } from "lodash";
import {
  deliveryDays,
  ICart,
  IOrderItemsProps,
  IOrderProps,
  IOrderRequestProps,
  IPromocodes,
  IStew,
  ITopup,
  localData,
  UserTypes,
} from "../../types";
import { arkeselAdminMessage, bannerItems, lowLimit } from "../constants";

export const generateTopupQueue = (args: ITopup[]): string => {
  if (args.length <= 0) return "";

  return (
    `Topups: ` +
    {
      1: `${args[0].name}`,
      2: `${args[0].name}, ${args[1]?.name}`,
      3: `${args[0].name}, ${args[1]?.name}, +${args.length - 2}`,
    }[Math.min(args.length, 3)]
  );
};

export const calcCartTotal = (
  args: Pick<ICart, "orderItems" | "discount">
): Omit<ICart, "orderItems"> => {
  let amountDeducted = 0;

  const subtotal = args.orderItems.reduce(
    (cur, { price, quantity, topups }) => {
      cur = cur + price * quantity;
      return (
        cur +
        topups.reduce((cur, { price }) => {
          return cur + price * quantity;
        }, 0)
      );
    },
    0
  );

  if (args.discount.code) {
    const { percentage, amount } = args.discount.code;
    amountDeducted = calcDiscount(percentage, amount, subtotal);
  }

  const total = subtotal - amountDeducted;
  return {
    subtotal,
    total,
    discount: { ...args.discount, amountDeducted },
  };
};

const calcDiscount = (
  percentage: number,
  amount: number,
  subtotal: number
): number => {
  if (percentage > 0) {
    return Math.round(subtotal * percentage);
  }

  return amount;
};

export const calcOrderAndTopups = (
  price: number,
  quantity: number,
  topups: ITopup[]
): number =>
  price * quantity +
  topups.reduce((acc, cur) => {
    return acc + cur.price * quantity;
  }, 0);

export const changeElementClassName = (
  element: HTMLElement | null,
  classList: string[],
  action: "add" | "remove"
) => {
  for (const c of classList) {
    switch (action) {
      case "add":
        element?.classList.add(c);
        break;
      case "remove":
        element?.classList.remove(c);
        break;
    }
  }
};

export const shuffleStews = (args: IStew[]): string[] => {
  const shuffled: string[] = [];

  for (let i = 0; i < 3; i++) {
    const shuffle = args.map((arg) => arg.id)[
      Math.floor(Math.random() * args.length)
    ];
    if (!shuffled.includes(shuffle)) {
      shuffled.push(shuffle);
    }
  }
  return shuffled;
};

export const getBannerText = (arg: string): string => {
  return filter(bannerItems, ["to", arg])[0].name;
};

export const setDeliveryDate = (date: Date = new Date()): deliveryDays => {
  const day = date.getDay();

  if (day <= 1 || day === 6) {
    return "tuesday";
  }

  return "saturday";
};

export const convertOrderItems = (
  items: IOrderItemsProps[]
): IOrderRequestProps[] => {
  return items.reduce((acc: IOrderRequestProps[], item) => {
    const { id, quantity, topups, additionalNotes, allergies } = item;
    acc.push({
      stew: { id },
      quantity,
      topups,
      additional_note: additionalNotes ?? "",
      allergies: allergies ?? "",
    });
    return acc;
  }, []);
};

export const isSMSBalanceLow = (balance: number): boolean => {
  return balance <= lowLimit;
};

export const createLowLimtMessage = (sms_balance: string): string => {
  return `${arkeselAdminMessage}${sms_balance}`;
};

export const createNewOrderMessage = (tracking_id: string): string => {
  return `An order with this tracking id has been created. Tracking id: ${tracking_id}`;
};

export const createUserMessage = (
  name: string,
  trackingId: string,
  deliveryDate: deliveryDays
): string => {
  return `Hello ${name.toUpperCase()}, \n\nYour order has been created successfully. We will process your order and deliver it to you.\n\n Your order trackingId is ${trackingId} and your delivery date is ${deliveryDate}. Visit https://finger-licking.com/track to track your order. \n\nThank you for choosing us.`;
};

export const createRecipientsArray = (
  recipients: string | string[]
): string[] => {
  if (typeof recipients === "string") {
    const arr: string[] = [];
    const number: string =
      recipients.length === 10 ? recipients.replace(recipients[0], "233") : "";
    arr.push(number);
    return arr;
  }
  return recipients;
};

export const addDataToLocalStorage = (type: localData, arg: any): void => {
  switch (type) {
    case "trackingIDs":
      let newTrackingIDs: string[] = [];
      const data = getDataFromLocalStorage(type);

      if (data !== null) {
        newTrackingIDs = JSON.parse(data);
      }
      if (newTrackingIDs.join(",").includes(arg)) return;

      newTrackingIDs.push(arg);

      return localStorage.setItem(type, JSON.stringify(newTrackingIDs));

    case "formData":
      let newFormData: Pick<
        IOrderProps,
        "student_location_data" | "public_location_data" | "user_data"
      > = {
        user_data: { full_name: "", phone_number: "", email: "" },
        student_location_data: { hall_name: "", room_number: "" },
        public_location_data: { address: "", city: "" },
      };

      const localState = getDataFromLocalStorage(type);

      if (localState !== null) {
        newFormData = JSON.parse(localState);
      }

      if (arg !== null) {
        Object.keys(newFormData).forEach(() => {
          newFormData["user_data"] = { ...arg["user_data"] };
          newFormData["student_location_data"] = {
            ...arg["student_location_data"],
          };
          newFormData["public_location_data"] = {
            ...arg["public_location_data"],
          };
        });
      }

      return localStorage.setItem(type, JSON.stringify(newFormData));
  }
};

export const getDataFromLocalStorage = (type: localData): string | null =>
  localStorage.getItem(type);

export const resetDataInLocalStorage = (type: localData): void => {
  localStorage.removeItem(type);
};

export const checkCartItemsQuantity = (
  orderQuanities: Pick<IOrderItemsProps, "quantity">[]
): number =>
  orderQuanities.reduce((current, { quantity }) => current + quantity, 0);

export const checkPromocodeRequirement = (
  cartOrderCount: number,
  userType: UserTypes,
  { requirements }: IPromocodes
): { status: boolean; message: string } => {
  const { individual, order_count } = requirements;
  const { condition, value } = order_count;

  let requirementMeet: { status: boolean; message: string } = {
    status: false,
    message: "",
  };

  requirementMeet.status =
    (condition === "greater"
      ? cartOrderCount >= value
      : cartOrderCount < value) && individual.toLowerCase() === userType;

  return requirementMeet;
};
