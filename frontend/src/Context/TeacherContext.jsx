import { createContext, useState } from "react";

const TeacherContext = createContext({
  teacher: {},
  login: (teacher) => {},
  logout: () => {},
});

export const Provider = ({ children }) => {
  const [teacher, setTeacher] = useState({});
  const teacherIsLoggedIn = Object.keys(teacher) != 0; // if no firstname or lastname

  const loginHandler = (teacher) => {
    setTeacher(teacher);
  };
  const logoutHandler = () => {
    setTeacher({});
  };

  const contextValue = {
    teacher: teacher,
    isLoggedIn: teacherIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext;
