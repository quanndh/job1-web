import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isLogin }) => {
  return <>{isLogin ? children : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
