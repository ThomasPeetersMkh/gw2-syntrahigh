import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import "./coursedetails.scss";
import CourseStudentDetails from "./CourseStudentsTable";
import EditScores from "./EditScores";
import { coursesArr } from "../../helpers";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const CourseDetails = () => {
  const [editScoreStudent, setEditScoreStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const { vakId } = useParams();
  const naam = vakId.split("-").join(" ");
  const { post } = useAxios("https://www.wdev2.be/fs_thomasp/api/courses/");
  const { data } = post("details", {
    vak_naam: naam,
  });
  const { vak_naam, vak_omschr, students } = data;

  //get course info
  const course = coursesArr.find(({ name }) => name === vakId);

  const navigate = useNavigate();

  const updateScore = (e) => {
    e.preventDefault();

    (async () => {
      try {
        const body = {
          llg_id: editScoreStudent.llg_id,
          vak_id: course.id,
          llg_vak_score: editScoreStudent.llg_vak_score,
        };

        const response = await axios(`https://wdev2.be/fs_thomasp/api/scores`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        console.log(response);

      } catch (err) {
        console.log(err);
        setErrorMessage(true);
        setEditScoreStudent(null);
      }
    })();
  };

  return (
    <>
      <button className="studentdetails__button" onClick={() => navigate(-1)}>
        Ga terug
      </button>
      <div className="vakdetail">
        <div className="vakdetail__left">
          <h1 className="vakdetail__left__title">{vak_naam}</h1>
          <p className="vakdetail__left__description">{vak_omschr}</p>
          {editScoreStudent && (
            <EditScores
              editScoreStudent={editScoreStudent}
              updateScore={updateScore}
              setEditScoreStudent={setEditScoreStudent}
            />
          )}
          {errorMessage && (
            <div className="error">
              <h4>we konden uw veroek niet verwerken</h4>
              <div
                className="error__icon_close"
                onClick={() => setErrorMessage(false)}
              >
                <IoClose size={30} />
              </div>
            </div>
          )}
        </div>
        <div className="vakdetail__right">
          {students && (
            <CourseStudentDetails
              students={students}
              setEditScoreStudent={setEditScoreStudent}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
