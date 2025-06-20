import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import MenuBar from "../pages/MenuBar";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Outlet />
      <MenuBar />
    </>
  );
};

export default ProtectedRoute;
