import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Course() {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/courses")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAuth(true);
          setData(res.data);
        } else {
          setAuth(false);
          setMessage("No data available.");
        }
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
        setMessage("Error fetching data.");
      });
  }, []);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      Axios.delete(`http://localhost:5000/deletecourse/${id}`)
        .then(() => {
          setData((prevData) => prevData.filter((item) => item.id !== id));
          navigate("/courses");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Not deleted!");
    }
  };

  return (
    <div>
      {auth ? (
        <div className="d-flex justify-content-center align-items-center p-4 ">
          <div className="bg-white">
            <Link to="/create_course" className="btn btn-info p-3 my-4">
              Add Courses
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course description</th>
                  <th>Faculty initials</th>
                  <th>Room No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.description}</td>
                      <td>{d.faculty}</td>
                      <td>{d.room}</td>
                      <td>
                        <Link
                          to={`/cor_update/${d.id}`}
                          className="btn btn-success mx-2"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="btn btn-danger mx-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
}

export default Course;
