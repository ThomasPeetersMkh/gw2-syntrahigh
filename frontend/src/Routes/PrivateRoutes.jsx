import { useContext } from "react";
import TeacherContext from "../Context/TeacherContext";
import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const teacherCtxt = useContext(TeacherContext);
  return teacherCtxt.isLoggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
