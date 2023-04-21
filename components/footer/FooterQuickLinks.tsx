import { Link } from "react-router-dom";

import { INavItems } from "../../types";

import FooterHeader from "./FooterHeader";

const FooterQuickLinks = () => {
  const navItems: INavItems[] = [
    { to: "/", name: "home" },
    { to: "/menu", name: "menu" },
    { to: "/track", name: "track order" },
    { to: "/contact", name: "frequently asked questions" },
  ];

  return (
    <div className="flex flex-col justify-between h-2/3 w-fit mx-auto md:flex-row md:w-4/5 md:items-center sm:w-full sm:px-10">
      <FooterHeader text="quick links" />
      <div className="h-3/4 md:basis-3/4">
        <ul className="h-full capitalize text-background400 text-xl flex flex-col justify-evenly md:flex-row md:flex-wrap md:gap-2 md:items-center">
          {navItems.map(({ to, name }) => (
            <li key={name}>
              <Link to={to}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterQuickLinks;
