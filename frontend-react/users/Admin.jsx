import { Link } from "react-router-dom";
const Admin = ({ name }) => {
  return (
    <div>
      <h2>Welcome Admin</h2>
      <p className="fs-2 lead">
        Lets start working <b>{name}</b> , shall we?
      </p>

      <div className="d-flex p-3 justify-content-center">
        <Link to={"/list"} className="btn btn-outline-primary me-4 pt-2">
          Go to the edit student list
        </Link>
        <br />
        <br />

        <Link to={"/courses"} className="btn btn-outline-info ms-2 pt-2">
          Add Courses
        </Link>

        <Link
          to={"/student_courses"}
          className="btn btn-outline-success ms-4 pt-2"
        >
          Booked courses
        </Link>
      </div>
    </div>
  );
};

export default Admin;
