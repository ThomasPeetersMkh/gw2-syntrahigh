import { useContext } from "react";
import TeacherContext from "../../Context/TeacherContext";
import { NavLink } from "react-router-dom";

import "./sidenavbar.scss";

const SideNavBar = () => {
  const teacherCtxt = useContext(TeacherContext);

  const logoutHandler = () => {
    teacherCtxt.logout();
  };

  return (
    <>
      <div className="sidebar_container">
        <div className="sidebar_container__links">
          {/* <NavLink to="/">Start</NavLink> */}
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            to="aankondigingen"
          >
            Aankondigingen
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            to="studenten"
          >
            Studenten
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            to="vakken"
          >
            Mijn vakken
          </NavLink>
        </div>
        <div className="sidebar_container__logout">
          <button
            className="sidebar_container__logout__inner"
            onClick={logoutHandler}
          >
            Afmelden
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
