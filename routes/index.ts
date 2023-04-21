import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import NotFound404 from "../pages/NotFound404";
import StewDetails from "../pages/StewDetails";
import TrackOrder from "../pages/TrackOrder";
import { IRoutes } from "../types";

const routes: IRoutes[] = [
  { path: "/", component: Home },
  { path: "/menu", component: Menu },
  { path: "/contact", component: Contact },
  { path: "/track", component: TrackOrder },
  { path: "/stew/:id", component: StewDetails },
  { path: "*", component: NotFound404 },
];

export default routes;
