import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { changeElementClassName, mobileViewport } from "../../helpers";

import NavItems from "./NavItems";

const Nav = () => {
  const { pathname } = useLocation();
  const navElement = useRef<HTMLElement>(null);
  const [viewport, setViewport] = useState<"desktop" | "mobile">(
    window.innerWidth > mobileViewport ? "desktop" : "mobile"
  );

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 20 && navElement) {
      changeElementClassName(
        navElement.current,
        ["shadow-lg", "shadow-primary300/20", "backdrop-blur-sm"],
        "add"
      );
    } else {
      changeElementClassName(
        navElement.current,
        ["shadow-lg", "shadow-primary300/20", "backdrop-blur-sm"],
        "remove"
      );
    }
  });

  window.addEventListener("resize", () => {
    setViewport(window.innerWidth > mobileViewport ? "desktop" : "mobile");
  });

  switch (viewport) {
    case "desktop":
      return (
        <StyledNav
          ref={navElement}
          className="w-full flex max-h-20 h-20 sticky top-0 left-0 z-40 transition-all duration-500 md:hidden"
        >
          <div className="w-4/5 flex justify-between mx-auto xl:w-[80%]">
            <div className="flex justify-center items-center">
              <Link to="/" className="h-3/5">
                <img
                  className="h-full"
                  src={require("../../assets/images/logo/logo-color.png")}
                  alt="official fingerlicking logo"
                />
              </Link>
            </div>
            <NavItems viewport={viewport} />
          </div>
        </StyledNav>
      );
    case "mobile":
      return (
        <nav className="z-30 pt-3 flex justify-center items-center h-24 w-[100vw] bg-white backdrop-blur-sm fixed bottom-0 left-0">
          {!pathname.includes("/stew") &&<NavItems viewport={viewport} />}
        </nav>
      );
  }
};

const StyledNav = styled.nav`
  @media only screen and (min-width: 120em) {
    width: 1920px !important;
    margin: 0 auto;
  }
`;

export default Nav;
