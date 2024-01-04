import { useEffect, useState } from "react";
import Axios from "axios";

const Courselist = () => {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");

    Axios.get(`http://localhost:5000/enrollments/user/${loggedInUserId}`)
      .then((response) => {
        setCourseList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  }, []);

  const formatEnrollmentDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString();
    return formattedDate;
  };

  return (
    <div>
      <h1 className="lead fs-1 text-primary pt-2 ps-4 fw-bold text-center">
        Enrolled course list
      </h1>
      <h5 className="lead text-center py-1 ps-4">
        Contact with the administrator to drop a course
      </h5>
      {courseList &&
        courseList.map((course) => (
          <div key={course.id} className="shadow-lg pt-4 mt-4">
            <div>
              <h3 className="display-4 text-primary ps-4">{course.name}</h3>
              <h2 className="display-5 ps-4 py-1 text-success">
                {course.description}
              </h2>
              <p className="fs-5 lead ps-4 py-1">{course.details}</p>
              <p className="fs-5 ps-4 py-1">
                Faculty : <b>{course.faculty}</b>
              </p>
              <p className="fs-5 ps-4 py-1">
                {" "}
                Room: <b>{course.room}</b>{" "}
              </p>
              <p className="ps-4 py-1 pb-5 fs-5">
                {" "}
                Enrollment ID: <b>{course.enrollment_id}</b>
                <br></br>
                Enrollment Date:{" "}
                <b>
                  {formatEnrollmentDate(course.enrollment_date)} (In MM/DD/YY
                  format)
                </b>
              </p>
            </div>{" "}
          </div>
        ))}
    </div>
  );
};

export default Courselist;
