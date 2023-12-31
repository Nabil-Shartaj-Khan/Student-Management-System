import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Courseupdate = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [fac, setFac] = useState("");
  const [room, setRoom] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:5000/courses/${id}`)
      .then((response) => {
        const { name, description, faculty, room } = response.data;
        setName(name);
        setDesc(description);
        setFac(faculty);
        setRoom(room);
      })
      .catch((error) => {
        console.error("Error fetching Course data:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/cor_update/${id}`, {
      name,
      desc,
      fac,
      room,
    })
      .then((result) => {
        navigate("/courses");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 rounded">
        <h2 className="display-2 text-success pb-3">Update Course details-</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username">Course name:</label>
            <input
              type="text"
              placeholder="Enter the name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Description:</label>
            <input
              type="text"
              placeholder="course description"
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Faculty:</label>
            <input
              type="text"
              placeholder="Enter faculty info"
              className="form-control"
              value={fac}
              onChange={(e) => setFac(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username">Room: </label>
            <input
              type="text"
              placeholder="Enter the Room no"
              className="form-control"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button className="btn btn-success pt-2 mt-3">
            Update Information
          </button>
          <blockquote className="lead pt-3">
            Please double check the information as it is important
          </blockquote>
        </form>
      </div>
    </div>
  );
};

export default Courseupdate;
