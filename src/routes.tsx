import { RouteObject } from "react-router-dom";
import Account from "./pages/Account";
import LoginScreen from "./pages/Auth/Login";
import SignupCard from "./pages/Auth/Signup";
import Sale from "./pages/PreSale/Sale";

export const AppRoutes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  presale: "/presale/:type",
  pinksale: "/presale/pinksale",
  apesale: "/presale/apesale",
  unicrypt: "/presale/unicrypt",
  gempad: "/presale/gempad",
  pandasale: "/presale/pandasale",
};

interface IPageRoute {
  path: string;
  element?: any;
  private?: boolean;
}

export const PageRoutes: IPageRoute[] = [
  { path: AppRoutes.root, element: <Account />, private: true },
  { path: AppRoutes.signup, element: <SignupCard /> },
  { path: AppRoutes.login, element: <LoginScreen /> },
  { path: AppRoutes.presale, element: <Sale />, private: true },
  // { path: AppRoutes.pinksale, element: <Sale />, private: true },
  // { path: AppRoutes.unicrypt, element: <Sale />, private: true },
  // { path: AppRoutes.gempad, element: <Sale />, private: true },
  // { path: AppRoutes.pandasale, element: <Sale />, private: true },
];
