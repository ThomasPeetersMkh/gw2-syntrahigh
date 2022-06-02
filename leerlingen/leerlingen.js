const api1 =
  "https://randomuser.me/api/?nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,no,nl,nz,tr,us";

const api2 = "https://randomuser.me/api/?results=200";

// courses with their id's (as they will be in the db)
// wiskunde: 1,
// nederlands: 2,
// frans: 3,
// lichamelijke opvoeding: 4,
// biologie: 5,
// fysica: 6,
// plastische opvoeding: 7,
// aardrijkskunde: 8,
// chemie: 9

const createStudent = async () => {
  try {
    await fetch(api1)
      .then((response) => response.json())
      .then(({ results }) =>
        results.map(({ name, picture }) => {
          //selection of courses (id's)
          const courseSelections = [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 7, 8, 9],
            [1, 2, 3, 5, 7, 9],
            [1, 2, 3, 8, 6, 4],
          ];

          // random courseSelection per student
          const coursesStudent =
            courseSelections[
              Math.floor(Math.random() * courseSelections.length)
            ];

          //6 random results for student: 1 per course
          const resultsStudent = [];
          for (let i = 0; i < 6; i++) {
            resultsStudent.push(
              Math.floor(Math.random() * (100 - 30 + 1) + 20)
            );
          }

          // melt courses together with results in object with course:result
          const coursesAndResults = resultsStudent.reduce(function (
            result,
            field,
            index
          ) {
            result[coursesStudent[index]] = field;
            return result;
          },
          {});

          // random student number
          let studentNr = "SH" + Math.floor(Math.random() * 10000);

          //create a student object
          const student = {
            id: studentNr,
            name: name.last,
            firstname: name.first,
            email: `${name.first}.${name.last}@syntrahigh.be`,
            results: coursesAndResults,
            image: picture.large,
          };

          const postStudentDetailsToDb = async () => {
            try {
              await fetch("API-TO-POST-TO-STUDENT-TABLE", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: {
                  llg_naam: student.name.last,
                  llg_voornaam: student.name.first,
                  llg_email: student.email,
                  llg_image_url: student.image,
                },
              })
                .then((response) => response.json())
                .then(/* log response from db*/);
            } catch (err) {
              console.log(err);
            }
            postStudentDetailsToDb();
          };

          const postScoresToDb = async () => {
            try {
              await fetch("API-TO-POST-TO-STUDENT/VAK-TABLE", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: {
                  //geen idee hoe ik dat eigenlijk meegeef
                },
              })
                .then((response) => response.json)
                .then(/*log response from db */);
            } catch (err) {
              console.log(err);
            }
          };
          postScoresToDb();
        })
      );
  } catch (err) {
    console.log(err);
  }
};

createStudent();

// met promise een array opvullen met 200 studenten
// array loopen en per student -> post requests -> 1 post naar studenttabel (id, name, firstname, email), 1 post naar vakkentabel (met alle vakken in de array (ids))
// allemaal in ne setinterval/settimeout om de 2 seconden
