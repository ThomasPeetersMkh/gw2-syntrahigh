import { useState } from "react";
import { coursesArr } from "../../../helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddStudent = () => {
  // currently image = text input => change later!!!!!!
  const [studentNr, setStudentNr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [courses, SetCourses] = useState([]);
  const [disabled, setDisabled] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const id = e.target.id;
    if (!courses.includes(id)) {
      SetCourses([...courses, id]);
      if (courses.length + 1 === 5) {
        setDisabled(true);
      }
    } else {
      SetCourses(courses.filter((el) => el !== id));
      setDisabled(false);
    }
  };

  const handleDisabled = (id) => {
    if (courses.includes(String(id))) {
      return false;
    } else {
      return disabled;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const body = {
          llg_studentnr: studentNr,
          llg_voornaam: firstName,
          llg_naam: lastName,
          llg_image_url: image,
          vakken: courses,
        };
        const data = await axios("https://wdev2.be/fs_thomasp/api/students", {
          method: "POST",
          data: JSON.stringify(body),
        });
        navigate(data.data.llg_id);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <form className="crud_form" onSubmit={handleSubmit}>
        <div className="crud_form__sections">
          <div className="crud_form__sections__student_details">
            <input
              type="text"
              value={studentNr}
              placeholder="Studentennummer"
              onChange={(e) => setStudentNr(e.target.value)}
            />
            <input
              type="text"
              value={firstName}
              placeholder="Voornaam"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              placeholder="Achternaam"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              name="image"
              placeholder="Foto"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="crud_form__sections__student_courses">
            <label>Vakken {"(max 5)"}</label>
            {coursesArr.map(({ id, name }) => {
              const dis = handleDisabled(id);
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    name={name}
                    onChange={handleChange}
                    disabled={dis}
                  />
                  <label>{name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="crud_form__button button button_form" type="submit">
          Voeg de student toe
        </button>
      </form>
    </>
  );
};

export default AddStudent;
