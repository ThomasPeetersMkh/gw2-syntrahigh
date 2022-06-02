import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentsTable from "./StudentsTable";

import "./students.scss";
import CrudModal from "../CrudModal/CrudModal";
import AddStudent from "../CrudModal/CrudForm/AddStudent";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const {
          data: { body },
        } = await axios("https://wdev2.be/fs_thomasp/api/students");
        setLoading(false);
        setError(false);
        setStudents(body);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  function search(rows) {
    return rows.filter(
      (row) =>
        row.llg_voornaam.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        row.llg_naam.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        row.llg_studentnr.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
  }

  return (
    <>
      <div className="students__container">
        <div className="students__container__input-wrapper">
          <input
            type="text"
            name="students__input"
            className="students__container__input"
            placeholder="Zoeken..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <span>🔍</span>
        </div>

        <StudentsTable students={search(students)} />
      </div>
      <button className="toevoegen" onClick={() => setShowModal(true)}>
        Toevoegen
      </button>
      {showModal && (
        <CrudModal setShowModal={setShowModal}>
          <AddStudent />
        </CrudModal>
      )}
    </>
  );
};

export default Students;
