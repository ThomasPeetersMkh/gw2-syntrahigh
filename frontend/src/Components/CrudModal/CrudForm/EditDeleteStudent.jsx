import "../crudmodal.scss";

const EditDeleteStudent = ({ student, setStudent, handleSubmit }) => {
  return (
    <>
      <form className="form_edit_delete" onSubmit={handleSubmit}>
        <label>Studentennummer</label>
        <input
          type="text"
          name="studentNr"
          placeholder={student.llg_studentnr}
          value={student.llg_studentnr}
          onChange={(e) =>
            setStudent({ ...student, llg_studentnr: e.target.value })
          }
        />
        <label>Voornaam</label>
        <input
          type="text"
          name="firstName"
          placeholder={student.sllg_voornaam}
          value={student.llg_voornaam}
          onChange={(e) =>
            setStudent({ ...student, llg_voornaam: e.target.value })
          }
        />
        <label>Achternaam</label>
        <input
          type="text"
          name="lastName"
          placeholder={student.llg_naam}
          value={student.llg_naam}
          onChange={(e) => setStudent({ ...student, llg_naam: e.target.value })}
        />
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={student.llg_image_url}
          onChange={(e) =>
            setStudent({ ...student, llg_image_url: e.target.value })
          }
        />
        <button className="button button_form" type="submit">
          Wijzig de student
        </button>
      </form>
    </>
  );
};

export default EditDeleteStudent;
