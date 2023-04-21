import {IPromocodes, Type} from ".."

export interface ICart {
  orderItems: IOrderItemsProps[];
  subtotal: number;
  discount: {
    code: IPromocodes | null;
    amountDeducted: number;
  };
  total: number;
}

export interface IAlert {
  type: "success" | "error" | "warning" | "info" | null;
  visible: boolean;
  message: string;
}

export interface IStew {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  defaultTopup?: Pick<ITopup, "name">;
  topups: ITopup[];
}

export interface ITopup {
  id: string;
  name: string;
  price: number;
}

export interface IInputProps {
  type: "text" | "search" | "email" | "tel";
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface IHeaderCardProps {
  title: string;
  type: Type;
}

export interface IAddToCart
  extends Pick<IStew, "id" | "name" | "image" | "price"> {
  type: Type;
  quantity: number;
  selectedTopups: ITopup[];
}

export interface IQuantityProps {
  quantity: number;
}
export interface IOrderItemsProps
  extends Pick<IStew, "id" | "name" | "price" | "image">,
    IQuantityProps {
  topups: ITopup[];
  allergies?: string;
  additionalNotes?: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IButtonsProps {
  text: string;
  type: Type;
  to?: string;
  onClick?: Function;
}

export interface IFilterOptions {
  id: string;
  label: string;
  type: "checkbox" | "radio";
  options: { id: string; value: string }[];
}

export interface IFilterProps {
  type: "discount" | "ingredients";
  value: string;
}
