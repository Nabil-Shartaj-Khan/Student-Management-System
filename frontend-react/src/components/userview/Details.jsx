import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const loggedInUserId = localStorage.getItem("userId");
  console.log(loggedInUserId);

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/details/${id}`)
      .then((res) => {
        if (Object.keys(res.data).length > 0) {
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
  }, [id]);

  const handleBooking = () => {
    const confirmEnrollment = window.confirm(
      "Are you sure you want to enroll in this course?"
    );
    if (confirmEnrollment) {
      Axios.post("http://localhost:5000/enrollments/book", {
        student_id: loggedInUserId,
        course_id: id,
      })
        .then((response) => {
          console.log("Booking successful!", response.data);
          alert("Booking successful!");
        })
        .catch((error) => {
          console.error("Error booking:", error);
          alert("Error occurred while booking. Please try again.");
        });
    } else {
      console.log("Enrollment cancelled");
      alert("Enrollment cancelled.");
    }
  };

  return (
    <div className="container pt-4 mt-4">
      {auth ? (
        <div>
          <p className="display-2 text-primary fw-bold">{data.name}</p>
          <h5 className="display-5">{data.description}</h5>
          <hr></hr>
          <div>
            <h5 className="display-6 text-muted pt-4">About the course-</h5>
            <p className="fs-4">{data.details}</p>
            <p className="fs-2 text-muted pt-3">Other details-</p>
            <p className="fs-4">
              <b>Faculty:</b> {data.faculty}
            </p>
            <p className="fs-4">
              <b>Room no:</b> {data.room}
            </p>
            <p className="fs-4">
              <b>Current Seat limit:</b> {data.seat_limit}
            </p>
            <p className="pt-4 fs-5">
              Interested? Click here now to book seat-{" "}
              <button
                className="btn btn-success ms-3 px-5 py-2"
                onClick={handleBooking}
              >
                Book
              </button>
            </p>
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
};

export default Details;
