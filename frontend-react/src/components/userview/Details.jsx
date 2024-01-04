import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
const Details = () => {
  const [data, setData] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const loggedInUserId = localStorage.getItem("userId");

  console.log(loggedInUserId);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`http://localhost:5000/details/${id}`);
        if (Object.keys(res.data).length > 0) {
          setAuth(true);
          setData(res.data);
        } else {
          setAuth(false);
          setMessage("No data available.");
        }
      } catch (e) {
        console.log(e);
        setAuth(false);
        setMessage("Error fetching data.");
      }
    };

    fetchData();

    //storing course booking details
    const isCourseBooked = localStorage.getItem(`course_${id}_booked`);
    if (isCourseBooked === "true") {
      setConfirm(true);
    }
  }, [id]);

  const handleBooking = () => {
    if (selectedCourses.length >= 4) {
      alert("You have already selected the maximum number of courses (4).");
      return;
    }

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
          localStorage.setItem(`course_${id}_booked`, "true");
          setConfirm(true);
          setSelectedCourses([...selectedCourses, id]);
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
          <hr />
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

            {confirm ? (
              <>
                <button className="btn btn-dark ms-3 px-3 py-2" disabled>
                  Booked Successfully!
                </button>{" "}
                <p className="pt-3 fs-3">
                  Please navigate to your{" "}
                  <Link to={"/enroll_list"} className="btn btn-success">
                    Enrolled Course{" "}
                  </Link>{" "}
                  page for details
                </p>
              </>
            ) : (
              <p className="pt-4 fs-5 pe-4">
                Interested? Click here now to book seat-
                <button
                  className="btn btn-success ms-3 px-5 py-2"
                  onClick={handleBooking}
                >
                  Book
                </button>
              </p>
            )}
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
