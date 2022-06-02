import "./coursedetails.scss";

const EditScores = ({ editScoreStudent, setEditScoreStudent, updateScore }) => {
  return (
    <div className="edit_score">
      <h3>
        {editScoreStudent.llg_naam} {editScoreStudent.llg_voornaam}
      </h3>
      <form onSubmit={updateScore}>
        <input
          type="number"
          value={editScoreStudent.llg_Vak_score}
          placeholder={editScoreStudent.llg_vak_score}
          onChange={(e) =>
            setEditScoreStudent({
              ...editScoreStudent,
              llg_vak_score: e.target.value,
            })
          }
        ></input>
        <button type="submit">wijzig score</button>
      </form>
    </div>
  );
};

export default EditScores;
