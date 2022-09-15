import { RouteObject } from "react-router-dom";
import LoginScreen from "./pages/Auth/Login";
import SignupCard from "./pages/Auth/Signup";

export const AppRoutes = {
  root: "/",
  login: "/login",
  signup: "/signup",
  presale: "/presale",
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
  { path: AppRoutes.root, element: null },
  { path: AppRoutes.signup, element: <SignupCard /> },
  { path: AppRoutes.login, element: <LoginScreen /> },
];
