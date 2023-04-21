import React from "react";

type props = { status: boolean; index: string };

const Checkbox: React.FC<props> = ({ status, index }) => {
  return (
    <div className="flex justify-center item-center">
      <label
        className={
          (status
            ? `bg-primary400 border-transparent`
            : `bg-transparent border-text300`) +
          " border w-4 h-4 rounded transition-all duration-500"
        }
        htmlFor={`checkBox-${index}`}
      ></label>
      <input
        className="hidden"
        id={`checkBox-${index}`}
        name={`checkBox-${index}`}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
