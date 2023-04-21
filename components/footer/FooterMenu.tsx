import { useSelector } from "react-redux";

import { RootState } from "../../store";

import FooterHeader from "./FooterHeader";

const FooterMenu = () => {
  const stews = useSelector((state: RootState) => state.stews.results);
  return (
    <div className="flex flex-col justify-between h-2/3 w-fit mx-auto md:flex-row md:w-4/5 md:items-center sm:w-full sm:px-10">
      <FooterHeader text="stew list" />
      <div className="h-3/4 md:basis-3/4">
        <ul className="h-full capitalize text-background400 text-xl flex flex-col justify-evenly md:flex-row md:flex-wrap md:gap-2">
          {stews.map(({ name, id }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterMenu;
