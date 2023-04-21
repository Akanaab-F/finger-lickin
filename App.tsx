import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import styled from "styled-components";
import { v4 } from "uuid";

import routes from "./routes";

import { RootState, useAppDispatch, useAppSelector } from "./store";
import { addStews } from "./store/slices/stewSlice";
import { addTopup } from "./store/slices/topupSlice";

import { IResponseStew, ITopup } from "./types";
import { filterOptions } from "./helpers";
import ErrorHandler from "./helpers/functions/Errors/ErrorHandler";

import Nav from "./components/navigations/Nav";
import Alerts from "./components/Alerts";
import Footer from "./components/footer/Footer";
import Checkout from "./components/checkout/Checkout";
import { some } from "lodash";
import { getStews, getTopups } from "./services";

function App() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const toggleModal = useAppSelector(
    (state: RootState) => state.checkout.modal
  );
  const alerts = useAppSelector((state: RootState) => state.alerts);
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    getStews()
      .then(({ data }: { data: IResponseStew }) => {
        dispatch(addStews(data));
      })
      .catch(({ code, message }: any) => dispatch(ErrorHandler(code, message)));

    getTopups()
      .then(({ data }: { data: ITopup[] }) => {
        dispatch(addTopup(data));
        filterOptions.push({
          id: v4(),
          label: "ingredients",
          type: "checkbox",
          options: data.map(({ id, name }) => ({ id, value: name })),
        });
      })
      .catch(({ code, message }: any) => dispatch(ErrorHandler(code, message)));
  }, [dispatch]);

  useEffect(() => {
    if (pathname === "/menu") return;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (process.env.REACT_APP_STAGE === "staging") {
      const username = prompt("username");
      const password = prompt("password");

      if (username === "fl cuisine" && password === "fingerlicking")
        return setAuthorized(true);

      return setAuthorized(false);
    }
  }, []);

  return (
    <>
      {authorized ? (
        <StyledApp className="xs:mb-32">
          {toggleModal && <Checkout />}
          {some(alerts, ["visible", true]) && <Alerts />}
          <Nav />
          <Routes>
            {routes.map((route) => (
              <Route
                key={v4()}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
          <Footer />
          {process.env.REACT_APP_STAGE === "staging" && (
            <StyledStaging>
              <span>*staging</span>
            </StyledStaging>
          )}
        </StyledApp>
      ) : (
        <div>Unauthorized</div>
      )}
    </>
  );
}

export default App;

const StyledApp = styled.div``;

const StyledStaging = styled.div`
  position: fixed;
  bottom: 5%;
  left: 5%;
  background-color: red;
  padding: 1rem 1.5rem;
  border: 1px solid orange;

  span {
    color: white;
    text-transform: capitalize;
    font-weight: 700;
  }
`;
