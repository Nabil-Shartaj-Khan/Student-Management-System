import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Viewcourse = () => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/view")
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

  return (
    <div className="container">
      <h2 className="text-center pb-3">Course list</h2>
      <div className="row">
        {auth ? (
          data.map((course, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card border border-1 border-primary shadow-lg">
                <div className="card-body">
                  <h5 className="card-title fs-3 pb-2">{course.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <b>About: </b>
                    {course.description}
                  </h6>
                  <p className="card-text">
                    <b>Faculty: </b>
                    {course.faculty}
                  </p>
                  <p className="card-text">
                    <b>Room no: </b>
                    {course.room}
                  </p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">
                      <b>Seat status: </b>
                      {course.seat_limit}
                    </p>
                    <button className="card-text btn btn-success">
                      Book seat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
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
    </div>
  );
};

export default Viewcourse;
