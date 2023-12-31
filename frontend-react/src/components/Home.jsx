import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Admin from "../../users/Admin";
import User from "../../users/User";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");

    if (storedName && storedRole) {
      setAuth(true);
      setRole(storedRole);

      axios
        .get("http://localhost:5000/home")
        .then((res) => {
          if (res.data.status === "success") {
            const userName = res.data.name || "Name not available";
            setName(userName);
          } else {
            setMessage(res.data.Message);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setMessage("Error fetching user details");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        if (res.data.status === "success") {
          setAuth(false);
          localStorage.removeItem("userName");
          localStorage.removeItem("userRole");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <h1 className="text-center">Homepage</h1>
          <div>
            {role === "admin" ? <Admin name={name} /> : <User name={name} />}
          </div>
          <button className="btn btn-outline-success" onClick={handleLogout}>
            Logout Now
          </button>{" "}
          <br />
          <br />
        </div>
      ) : (
        <div>
          <h3>You are not authorized to view this page</h3>
          <p>{message}</p>
          <Link to={"/login"} className="btn btn-primary">
            Login now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
