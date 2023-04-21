import React from "react";

const TextDetailsLine: React.FC<{ keys: string; value: string }> = ({
  keys,
  value,
}) => {
  return (
    <div className="w-full px-2 py-1 text-text300 text-base tablet:text-xl font-regularFont flex justify-between items-center capitalize">
      <span>{keys}</span>
      <span>{value}</span>
    </div>
  );
};

export default TextDetailsLine;
