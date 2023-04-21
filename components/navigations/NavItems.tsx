import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { navItems } from "../../helpers";

import { toggleCheckoutModal } from "../../store/slices/checkoutSlice";
import CartBtn from "../buttons/CartBtn";
import { useAppDispatch } from "../../store";

const NavItems: React.FC<{ viewport: "mobile" | "desktop" }> = ({
  viewport,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleToggleCheckoutModal = useCallback(
    () => dispatch(toggleCheckoutModal()),
    [dispatch]
  );

  switch (viewport) {
    case "desktop":
      return (
        <StyledNavList className="flex self-stretch basis-1/2 justify-evenly items-center lg:basis-[55%] xl:justify-between xl:basis-[45%]">
          {navItems.map(({ to, name }) => (
            <li key={to}>
              <Link
                className={
                  pathname === to
                    ? "font-boldFont text-lg text-primary400 capitalize transition duration-500"
                    : "font-regularFont text-lg capitalize transition-all"
                }
                to={to}
              >
                {name}
              </Link>
            </li>
          ))}
          <li
            className="cursor-pointer"
            onClick={handleToggleCheckoutModal}
          >
            <CartBtn viewport={viewport} />
          </li>
        </StyledNavList>
      );
    case "mobile":
      return (
        <ul className="flex justify-between items-center md:w-3/5 xs:w-4/5">
          <StyledIcon>
            <Link to="/">
              <div>
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill={pathname !== "/" ? "none" : "#F4270A"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 11H14M6 15H14M19 9.15033V16.9668C19 19.1943 17.2091 21 15 21H5C2.79086 21 1 19.1943 1 16.9668V9.15033C1 7.93937 1.53964 6.7925 2.46986 6.02652L7.46986 1.90935C8.9423 0.696886 11.0577 0.696883 12.5301 1.90935L17.5301 6.02652C18.4604 6.7925 19 7.93937 19 9.15033Z"
                    stroke={pathname !== "/" ? "#F6523B" : "#fff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className={
                  pathname !== "/" ? "text-text300" : "text-primary300"
                }
              >
                home
              </h3>
            </Link>
          </StyledIcon>
          <StyledIcon>
            <Link to="/menu">
              <div>
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 12 10"
                  fill={pathname !== "/menu" ? "none" : "#F6523B"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1H11M1 5H11M1 9H11"
                    stroke={pathname !== "/menu" ? "#F6523B" : "#F4270A"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3
                className={
                  pathname !== "/menu" ? "text-text300" : "text-primary300"
                }
              >
                menu
              </h3>
            </Link>
          </StyledIcon>
          <StyledIcon>
            <Link to="/track">
              <div>
                {pathname !== "/track" ? (
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 17V5M13 17H15M13 17H8M13 5C13 2.79086 11.2091 1 9 1H5C2.79086 1 1 2.79086 1 5V13C1 14.8652 2.27667 16.4323 4.00384 16.875M13 5H16.2091C16.7172 5 17.2063 5.1934 17.577 5.54093L20.3679 8.15739C20.7712 8.53548 21 9.06365 21 9.61646V15C21 16.1046 20.1046 17 19 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17C4 16.958 4.00129 16.9163 4.00384 16.875M8 17C8 15.8954 7.10457 15 6 15C4.93742 15 4.06838 15.8286 4.00384 16.875"
                      stroke="#F6523B"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 6L7 6"
                      stroke="#F6523B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 10L5 10"
                      stroke="#F6523B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5 0.0621643H4C1.79086 0.0621643 0 1.85303 0 4.06216V12.0622C0 13.3678 0.625507 14.5273 1.59319 15.2573C1.95711 13.7118 3.34384 12.5622 5 12.5622C6.933 12.5622 8.5 14.1292 8.5 16.0622H11.5V4.06216C11.5 1.85303 9.70914 0.0621643 7.5 0.0621643ZM6 4.31216C5.58579 4.31216 5.25 4.64795 5.25 5.06216C5.25 5.47638 5.58579 5.81216 6 5.81216H8C8.41421 5.81216 8.75 5.47638 8.75 5.06216C8.75 4.64795 8.41421 4.31216 8 4.31216H6ZM3.25 9.06216C3.25 8.64795 3.58579 8.31216 4 8.31216H8C8.41421 8.31216 8.75 8.64795 8.75 9.06216C8.75 9.47638 8.41421 9.81216 8 9.81216H4C3.58579 9.81216 3.25 9.47638 3.25 9.06216ZM19.4456 15.4443C19.1538 13.806 17.7222 12.5622 16 12.5622C14.7268 12.5622 13.6124 13.242 13 14.2584V4.06216H15.2091C15.7172 4.06216 16.2063 4.25557 16.577 4.60309L19.3679 7.21955C19.7712 7.59765 20 8.12581 20 8.67863V14.0622C20 14.5983 19.7891 15.0851 19.4456 15.4443ZM7 16.0622C7 17.1667 6.10457 18.0622 5 18.0622C3.89543 18.0622 3 17.1667 3 16.0622C3 16.0202 3.00129 15.9785 3.00384 15.9371C3.06838 14.8908 3.93742 14.0622 5 14.0622C6.10457 14.0622 7 14.9576 7 16.0622ZM18 16.0622C18 17.1667 17.1046 18.0622 16 18.0622C14.8954 18.0622 14 17.1667 14 16.0622C14 14.9576 14.8954 14.0622 16 14.0622C17.1046 14.0622 18 14.9576 18 16.0622Z"
                      fill="#F4270A"
                    />
                  </svg>
                )}
              </div>
              <h3
                className={
                  pathname !== "/track" ? "text-text300" : "text-primary300"
                }
              >
                track
              </h3>
            </Link>
          </StyledIcon>
          <StyledIcon>
            <Link to="/contact">
              <div>
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill={pathname !== "/contact" ? "none" : "#F4270A"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12H15M7 8H11M20.9664 9.21661C20.9886 9.47478 21 9.73606 21 10C21 14.9706 16.9706 19 12 19H5C2.79086 19 1 17.2091 1 15V10C1 5.02944 5.02944 1 10 1H12C12.2639 1 12.5252 1.01136 12.7834 1.03362M21 4C21 5.65685 19.6569 7 18 7C16.3431 7 15 5.65685 15 4C15 2.34315 16.3431 1 18 1C19.6569 1 21 2.34315 21 4Z"
                    stroke={pathname !== "/contact" ? "#F6523B" : "#fff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3
                className={
                  pathname !== "/contact" ? "text-text300" : "text-primary300"
                }
              >
                contact
              </h3>
            </Link>
          </StyledIcon>
          <StyledIcon
            className="cursor-pointer"
            onClick={handleToggleCheckoutModal}
          >
            <CartBtn viewport={viewport} />
          </StyledIcon>
        </ul>
      );
  }
};

const StyledNavList = styled.ul``;

const StyledIcon = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  a {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

export default NavItems;
