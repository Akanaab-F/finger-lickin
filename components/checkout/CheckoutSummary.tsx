import React from "react";

const CheckoutSummary: React.FC<{
  title: "discount" | "total" | "subtotal";
  value: number;
}> = ({ title, value }) => {
  return (
    <div className="w-4/5 flex items-center justify-between font-regularFont">
      <span className="capitalize text-base text-text200">{title}</span>
      {title === "total" ? (
        <span className="font-boldFont text-slate-800">
          GHS &nbsp; {value.toFixed(2)}
        </span>
      ) : (
        <span>
          {title === "discount" && "-"} &#8373; &nbsp; {value}
        </span>
      )}
    </div>
  );
};

export default CheckoutSummary;
