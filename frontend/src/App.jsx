import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import "../styles/style.scss";
import TeacherContext from "./Context/TeacherContext";
import PrivateRoutes from "./Routes/PrivateRoutes";

function App() {
  const teacherCtxt = useContext(TeacherContext);
  return teacherCtxt.isLoggedIn === null ? (
    <h1>Loading...</h1>
  ) : (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/*" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
