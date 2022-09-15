import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import SidebarWithHeader from "./layout/MainLayout";
import SignupCard from "./pages/Auth/Signup";
import { PageRoutes } from "./routes";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SidebarWithHeader>
          <Routes>
            {PageRoutes.map((route) => {
              if (route.private) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<PrivateRoute>{route.element}</PrivateRoute>}
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
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
