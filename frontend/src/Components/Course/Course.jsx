import "./Course.scss";

const Course = ({ vak }) => {
  return (
    <div className="vak">
      <h2 className="vak__title">{vak}</h2>
    </div>
  );
};

export default Course;
