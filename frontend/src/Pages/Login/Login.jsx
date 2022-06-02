import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TeacherContext from "../../Context/TeacherContext";
import LoginForm from "./LoginForm";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const teacherCtxt = useContext(TeacherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://wdev2.be/fs_thomasp/api/login", {
      method: "POST",
      body: JSON.stringify({ lkt_emailadres: email, lkt_paswoord: password }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            teacherCtxt.login(data);
            navigate("/aankondigingen");
          });
        } else {
          res.json().then((data) => {
            alert(data.message);
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="login_body">
        <div className="login_body__login_container">
          <h2 className="login_body__login_container__title">
            Welcome to Syntra-High
          </h2>
          <div className="login_body__login_container__content">
            <div className="login_logo">
              <img src="./fs_thomasp/dist/assets/squarelogo.png" alt="test" />
            </div>
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
