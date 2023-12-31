import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Update() {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/list")
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
    Axios.delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        navigate("/list");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {auth ? (
        <div className="d-flex justify-content-center align-items-center p-4">
          <div className="bg-white">
            <Link to="/create" className="btn btn-info p-3 my-4">
              Add students
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td>{d.department}</td>
                      <td>{d.phone_no}</td>
                      <td>{d.city}</td>
                      <td>{d.gender}</td>
                      <td>
                        <Link
                          to={`/update/${d.id}`}
                          className="btn btn-primary mx-2"
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

export default Update;
