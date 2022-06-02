import React from "react";
import "./students.scss";
import { average, colorClass } from "../../helpers";
import { Link, useLocation } from "react-router-dom";

const StudentsTable = ({ students }) => {
  const { pathname } = useLocation();

  return (
    <>
      {students.length <= 0 && <p>Er zijn geen resultaten gevonden</p>}
      {students.length > 0 && (
        <div className="table_wrapper">
          <table className="students__table" cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>Nr</th>
                <th>Naam</th>
                <th>Voornaam</th>
                <th>Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map(
                ({ llg_id, llg_studentnr, llg_naam, llg_voornaam, vakken }) => (
                  <tr key={llg_id}>
                    <td>{llg_studentnr}</td>
                    <td>{llg_naam}</td>
                    <td>{llg_voornaam}</td>
                    <td className={colorClass(average(vakken))}>
                      {average(vakken)}
                    </td>
                    <td>
                      <Link to={pathname + "/" + llg_id}>🔍</Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default StudentsTable;
