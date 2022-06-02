import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CrudModal from "../CrudModal/CrudModal";
import EditDeleteStudent from "../CrudModal/CrudForm/EditDeleteStudent";

import "./studentdetails.scss";

const StudentDetails = () => {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [courseNames, setCourseNames] = useState([]);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          `https://wdev2.be/fs_thomasp/api/students/${params.studentId}`
        );
        setLoading(false);
        setError(false);
        setStudent(data);
        setCourseNames(Object.keys(data.vakken));
        setResults(Object.values(data.vakken));
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const data = await axios(
          `https://wdev2.be/fs_thomasp/api/students/${params.studentId}`,
          {
            method: "DELETE",
          }
        );
        navigate("/studenten");
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const body = {
          llg_studentnr: student.llg_studentnr,
          llg_naam: student.llg_naam,
          llg_voornaam: student.llg_voornaam,
          llg_image_url: student.llg_image_url,
        };


        const response = await axios.put(
          `https://wdev2.be/fs_thomasp/api/students/${params.studentId}`,
          {
            body: body,
          }
        );
        setShowModal(false);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <>
      <button className="studentdetails__button" onClick={() => navigate(-1)}>
        Ga terug
      </button>

      <div className="studentdetails__container">
        <div className="studentdetails__container__left">
          <h2>{student.llg_studentnr}</h2>
          <h2>{student.llg_naam + ", " + student.llg_voornaam}</h2>
          <p>{student.llg_email}</p>

          {courseNames.length > 0 && (
            <div className="studentdetails__container__left__results">
              <div className="coursenames">
                {courseNames.map((course) => (
                  <p>{course}</p>
                ))}
              </div>
              <div className="results">
                {results.map((result, i) => {
                  return result === null ? (
                    <p key={i}>n.v.t.</p>
                  ) : (
                    <p key={i}>{result}</p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <section className="studentdetails__container__right">
          <img src={student.llg_image_url} alt="studentenfoto"></img>

          <div className="studentdetails__container__right__buttons">
            <button onClick={() => setShowModal(true)}>Wijzig</button>
            <button onClick={handleDelete}>Verwijder</button>
          </div>
        </section>
      </div>

      {showModal && (
        <CrudModal setShowModal={setShowModal}>
          <EditDeleteStudent
            student={student}
            setStudent={setStudent}
            handleSubmit={handleSubmit}
          />
        </CrudModal>
      )}
    </>
  );
};
export default StudentDetails;
