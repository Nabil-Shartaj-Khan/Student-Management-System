import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState();
  const [dept, setDept] = useState();
  const [num, setNum] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/create", {
      name,
      dept,
      num,
      city,
      gender,
    })
      .then((result) => {
        navigate("/list");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 rounded">
        <h2 className="display-2 text-success pb-3">
          Add Student details now-
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter the name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Department:</label>
            <input
              type="text"
              placeholder="Enter the department"
              className="form-control"
              onChange={(e) => setDept(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Phone no:</label>
            <input
              type="text"
              placeholder="Enter the phone no"
              className="form-control"
              onChange={(e) => setNum(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">City: </label>
            <input
              type="text"
              placeholder="Enter the city"
              className="form-control"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Gender:</label>
            <input
              type="text"
              placeholder="Enter the gender"
              className="form-control"
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <button className="btn btn-success pt-2 mt-3">
            Submit Information
          </button>
          <blockquote className="lead pt-3">
            Please double check the information as it is important
          </blockquote>
        </form>
      </div>
    </div>
  );
};

export default Create;
