import { useContext } from "react";
import TeacherContext from "../../Context/TeacherContext";

import "./header.scss";

const Header = () => {
  const { teacher } = useContext(TeacherContext);
  return (
    <>
      <div className="sidebar_container__logo">
        <div className="imgHolder">
          <img
            src="./fs_thomasp/dist/assets/squarelogodark.png"
            alt="full syntra high logo"
          />
        </div>
      </div>
      <div className="header_container">
        <div className="header_container__teacher_credentials">
          <h1 className="header_container__teacher_credentials__title">
            Welkom, {teacher.lkt_voornaam}
          </h1>
        </div>
        <div className="header_container__teacher_picture">
          <img
            src={teacher.lkt_image_url}
            alt="teacher_picture"
            className="header_container__teacher_picture__img"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
