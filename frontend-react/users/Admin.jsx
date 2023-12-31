import { Link } from "react-router-dom";
const Admin = ({ name }) => {
  return (
    <div>
      <h2>Welcome Admin</h2>
      <p className="fs-3 lead">Lets start working, {name} , shall we?</p>

      <div className="d-flex p-3">
        <Link to={"/list"} className="btn btn-outline-primary me-4 pt-2">
          Go to the edit student list
        </Link>
        <br />
        <br />

        <Link to={"/courses"} className="btn btn-outline-info ms-2 pt-2">
          Add Courses
        </Link>
      </div>
    </div>
  );
};

export default Admin;