import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import List from "./components/operations/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Create from "./components/operations/Create";
import Update from "./components/operations/Update";
import Login from "./components/logireg/Login";
import Registration from "./components/logireg/Registration";
import Home from "./components/Home";
import Notfound from "../Notfound";
import Admin from "../users/Admin";
import User from "../users/User";
import Profile from "./components/profile/Profile";
import Course from "./components/course/Course";
import Courseupdate from "./components/course/Courseupdate";
import Createcourse from "./components/course/Createcourse";
import Viewcourse from "./components/userview/Viewcourse";
import Details from "./components/userview/Details";
import Courselist from "./components/userview/Courselist";

function App() {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getData");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h5 className="display-6 p-2 ps-3 fw-bold">{data}</h5>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/cor_update/:id" element={<Courseupdate />} />
          <Route path="/create_course" element={<Createcourse />} />
          <Route path="/view" element={<Viewcourse />} />
          <Route path="/enroll_list" element={<Courselist />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
