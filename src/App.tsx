import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { ApiHelper } from "./helper/http";
import "./index.css";
import SidebarWithHeader from "./layout/MainLayout";
import SignupCard from "./pages/Auth/Signup";
import { AppRoutes, PageRoutes } from "./routes";
import theme from "./theme";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [lastRoute, setLastRoute] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getMe = async () => {
      if (pathname !== AppRoutes.login && pathname !== AppRoutes.signup) {
        setLastRoute(pathname);
      }
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLogin(false);
        return;
      }

      const res = await ApiHelper.get<any>("/users");

      if (Boolean(res?.data.status)) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };
    getMe();
  }, [pathname]);

  useEffect(() => {
    if (
      isLogin &&
      (pathname === AppRoutes.login || pathname === AppRoutes.signup)
    ) {
      navigate(lastRoute);
    }
  }, [isLogin, pathname, lastRoute]);

  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader>
        <Routes>
          {PageRoutes.map((route) => {
            if (route.private) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute isLogin={isLogin}>
                      {route.element}
                    </PrivateRoute>
                  }
                />
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </SidebarWithHeader>
    </ChakraProvider>
  );
}

export default App;
