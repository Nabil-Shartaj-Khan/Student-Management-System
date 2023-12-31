import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Createcourse = () => {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [fac, setFac] = useState();
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/create_course", {
      name,
      desc,
      fac,
      room,
    })
      .then((result) => {
        alert(result.data.message);
        navigate("/courses");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 rounded">
        <h2 className="display-2 text-success pb-3">Add Course details-</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Course name:</label>
            <input
              type="text"
              placeholder="Enter the name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Description:</label>
            <input
              type="text"
              placeholder="Enter course description"
              className="form-control"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Faculty:</label>
            <input
              type="text"
              placeholder="Enter faculty info"
              className="form-control"
              onChange={(e) => setFac(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Classroom: </label>
            <input
              type="text"
              placeholder="Enter classroom"
              className="form-control"
              onChange={(e) => setRoom(e.target.value)}
              required
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

export default Createcourse;
