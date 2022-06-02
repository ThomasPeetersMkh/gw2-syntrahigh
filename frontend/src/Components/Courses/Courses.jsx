import React, { useContext } from "react";
import TeacherContext from "../../Context/TeacherContext";
import Course from "../../Components/Course/Course";
import "./courses.scss";
import { useLocation, Link } from "react-router-dom";

const Courses = () => {
  const {
    teacher: { vakken },
  } = useContext(TeacherContext);

  const { pathname } = useLocation();

  return (
    <>
      <div className="vakken">
        {vakken &&
          vakken.map((vak, index) => {
            return (
              <Link
                to={pathname + "/" + vak.split(" ").join("-")}
                key={index}
                className="vakken__link"
              >
                <Course vak={vak} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Courses;
