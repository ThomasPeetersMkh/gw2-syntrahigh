
const CourseStudentDetails = ({ students, setEditScoreStudent }) => {
  return (
    <>
      <div
        className="table_wrapper coursedetails__table"
        onClick={() => setErrorMessage(false)}
      >
        <table
          className="students__table coursedetails__table"
          cellPadding={0}
          cellSpacing={0}
        >
          <thead>
            <tr>
              <th>Nr</th>
              <th>Naam</th>
              <th>Voornaam</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 &&
              students.map(
                ({
                  llg_id,
                  llg_studentnr,
                  llg_naam,
                  llg_voornaam,
                  llg_vak_score,
                }) => (
                  <tr
                    key={llg_id}
                    onClick={() =>
                      setEditScoreStudent({
                        llg_id,
                        llg_studentnr,
                        llg_naam,
                        llg_voornaam,
                        llg_vak_score,
                      })
                    }
                  >
                    <td>{llg_studentnr}</td>
                    <td>{llg_naam}</td>
                    <td>{llg_voornaam}</td>
                    <td>{parseInt(llg_vak_score, 10)}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CourseStudentDetails;
