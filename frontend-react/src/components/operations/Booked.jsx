import { useState, useEffect } from "react";
import Axios from "axios";

const Booked = () => {
  const [showCourse, setShowCourse] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/student_courses")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAuth(true);
          setShowCourse(res.data);
          console.log("data", res.data);
        } else {
          setAuth(false);
          setShowCourse([]);
        }
      })
      .catch((e) => {
        console.log(e);
        setAuth(false);
        setShowCourse([]);
      });
  }, []);

  const handleDropCourse = (userId, courseId) => {
    const confirmDrop = window.confirm(
      "Are you sure you want to drop this course?"
    );
    if (confirmDrop) {
      Axios.delete(`http://localhost:5000/drop_course/${userId}/${courseId}`)
        .then((res) => {
          Axios.get("http://localhost:5000/student_courses")
            .then((res) => {
              if (res.data && res.data.length > 0) {
                setShowCourse(res.data);
                alert("Course has been dropped");
              } else {
                setShowCourse([]);
              }
            })
            .catch((e) => {
              console.log(e);
              setShowCourse([]);
            });
        })
        .catch((error) => {
          console.error("Error dropping course:", error);
        });
    } else {
      alert("Course drop was cancelled");
    }
  };

  return (
    <div>
      <h1 className="text-center text-success">Booked List Courses</h1>
      {auth ? (
        <table className="table fs-5">
          <thead>
            <tr>
              <th>User and ID</th>
              <th>Booked Course and ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showCourse.map((course, index) => (
              <tr key={index}>
                <td>
                  {course.user_name} (ID: {course.user_id})
                </td>
                <td>
                  {course.course_name} (ID: {course.course_id})
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDropCourse(course.user_id, course.course_id)
                    }
                  >
                    Drop Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{showCourse}</p>
      )}
    </div>
  );
};

export default Booked;
