import { v4 } from "uuid";
import { ICheckoutUser, IFAQ, IFilterOptions, INavItems } from "../../types";

export * from "./strings";

export const navItems: INavItems[] = [
  { to: "/", name: "home" },
  { to: "/menu", name: "menu" },
  { to: "/track", name: "track order" },
  { to: "/contact", name: "contact" },
];

export const bannerItems = [
  { to: "/menu", name: "Choose from a variety of spicy delicious stews" },
  {
    to: "/track",
    name: "Track your order and know what exactly you need to know",
  },
  { to: "/contact", name: "How can we help you today?" },
];

export const filterOptions: IFilterOptions[] = [
  // {
  //   type: "radio",
  //   label: "ratings",
  //   options: ["4.5 & up", "4.0 & up", "3.5 & up"],
  // },
  {
    id: v4(),
    type: "checkbox",
    label: "discount & offers",
    options: [{ id: v4(), value: "discount applied" }],
  },
  // { type: "radio", label: "prices", options: ["expensive", "normal"] },
];

export const faqsOptions: IFAQ[] = [
  {
    question: "How much is delivery?",
    answer:
      "To help students on campus, Fingerlicking is offering free delivery for orders placed on the Legon campus. However, for orders placed off-campus, a distance-based fee will be charged.",
  },
  {
    question: "Which days are deliveries made?",
    answer:
      "Fingerlicking has designated specific days for delivery: orders placed between Sunday and Monday will be delivered on Tuesday, while orders placed between Wednesday and Friday will be delivered on Saturday. In other words, delivery is available on Tuesdays and Saturdays only.",
  },
  {
    question:
      "Is there any other way to place an order without using the website?",
    answer:
      "Sadly, we don't accept orders from any other source other than this website. Our social media channels serve as support and assistance tools. Therefore orders placed through there won't be processed.",
  },
];

export const checkoutUsers: ICheckoutUser[] = [
  { type: "student", soon: false, disabled: false },
  { type: "public", soon: true, disabled: true },
];

export const adminRecipients = [
  "233544683405",
  "233553759656",
  "233552772292",
  "233241152153",
];
