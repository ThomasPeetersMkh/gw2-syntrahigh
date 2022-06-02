import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import TeacherContext from "../../Context/TeacherContext";
import "./home.scss";
import Header from "../../Components/Header/Header";
import SideNavBar from "../../Components/SideNavBar/SideNavBar";
import Announcements from "../../Components/Announcements/Announcements";
import Students from "../../Components/Students/Students";
import Courses from "../../Components/Courses/Courses";
import StudentDetails from "../../Components/StudentDetails/StudentDetails";
import CourseDetails from "../../Components/CourseDetails/CourseDetails";
import EditScores from "../../Components/CourseDetails/EditScores";

function Home() {
  const teacherCtxt = useContext(TeacherContext);

  return (
    <>
      <div className="layout">
        <SideNavBar />
        <Header />
        <div className="layout__changing">
          <Routes>
            <Route path="aankondigingen" element={<Announcements />} />
            <Route path="studenten/" element={<Students />} />
            <Route
              exact
              path="studenten/:studentId"
              element={<StudentDetails />}
            />
            <Route path="vakken/" element={<Courses />} />
            <Route exact path="vakken/:vakId/" element={<CourseDetails />} />
            <Route exact path="vakken/:vakId/*" element={<EditScores />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home;
