import { Link } from "react-router-dom";
import Profile from "../src/components/profile/Profile";
const User = ({ name }) => {
  return (
    <div>
      <h2>Welcome User</h2>
      <p className="fs-3 lead">nice to meet you, {name}</p>
      <Link to={"/profile"} className="btn btn-primary mb-4 me-2">
        Profile information
      </Link>
      <Link to={"/view"} className="btn btn-warning mb-4 ms-4">
        View courses
      </Link>
    </div>
  );
};

export default User;
