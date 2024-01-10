import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validation from "../validation/Loginvalidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((e) => console.log(e));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validation(values));
    setIsLoading(true);

    try {
      if (Object.values(errors).every((error) => error === "")) {
        const response = await axios.post(
          "http://localhost:5000/login",
          values
        );
        if (response.data.status === "success") {
          const { role, name, id, token } = response.data;
          localStorage.setItem("userRole", role);
          localStorage.setItem("userName", name);
          localStorage.setItem("userId", id);
          localStorage.setItem("token", token);
          setAuth(true);
          navigate("/home");
        } else {
          setErrorMessage("Invalid credentials or account not found.");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(
          "Invalid credentials! Please check your email and password."
        );
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("No account found! Please register.");
      } else {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setErrorMessage("");
  };

  return (
    <div>
      <h4 className="text-success fs-1 text-center">Login to Your Account</h4>
      <div className="d-flex justify-content-center align-items-center">
        <div className="p-3">
          <form
            action=""
            className="border border-primary border-2 p-5 m-5 shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control my-3 p-3"
                onChange={handleInput}
                name="email"
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control my-3 p-3"
                onChange={handleInput}
                name="password"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100">
              Log IN
            </button>
            <p className="lead mt-3">
              If you don't have an account, you can register one here!
            </p>
            <Link to="/signup" className="btn btn-primary w-100 mt-2">
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
