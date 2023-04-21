export type routesTypes =
  | "/"
  | "/menu"
  | "/track"
  | "/contact"
  | "/stew/:id"
  | "*";

export type INavItems = {
  to: string;
  name: string;
};

export interface IRoutes {
  path: routesTypes;
  component: () => JSX.Element;
}
