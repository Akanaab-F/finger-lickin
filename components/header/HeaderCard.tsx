import React from "react";

import { IHeaderCardProps } from "../../types";

type props = IHeaderCardProps;

const HeaderCard: React.FC<props> = ({ title, type }) => {
  switch (type) {
    case "primary":
      return (
        <h3 className="px-10 py-6 rounded-lg bg-primary400 text-background200 w-fit capitalize font-mediumFont text-2xl shadow-2xl shadow-primary300/10">
          {title}
        </h3>
      );
    case "secondary":
      return (
        <h3 className="px-10 py-6 rounded-lg bg-white text-primary300 w-fit capitalize font-mediumFont text-2xl shadow-2xl shadow-primary300/10">
          {title}
        </h3>
      );
  }
};

export default HeaderCard;
