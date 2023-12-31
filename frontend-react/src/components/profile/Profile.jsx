import React, { useEffect, useState } from "react";
import Axios from "axios";

const Profile = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/profile")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setList(res.data);
          setFormData({
            name: res.data[0].name,
            email: res.data[0].email,
            password: res.data[0].password,
            id: res.data[0].id,
          });
        } else {
          setMessage("No data available.");
        }
      })
      .catch((e) => {
        console.log(e);
        setMessage("Error fetching data.");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(
        "http://localhost:5000/profile/update",
        formData
      );
      console.log(response.data);
      setEditMode(false);
      const updatedUserData = list.map((user) => {
        if (user.id === formData.id) {
          return { ...user, name: formData.name };
        }
        return user;
      });

      setList(updatedUserData);
      alert("Information has been updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1 className="text-center">Your profile information</h1>

      {editMode ? (
        <form onSubmit={handleSubmit} className="text-center pt-5 mt-4 fs-4">
          <label>
            Name :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="ms-3 text-center mb-3"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="ms-3 text-center mb-3"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="ms-3 text-center mb-3"
            />
          </label>
          <button
            type="button"
            onClick={toggleShowPassword}
            className="btn btn-primary ms-2 pt-1"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <br />
          <br />
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>
      ) : (
        <ul className="fs-2 ms-4 pt-5">
          {list.map((d, i) => (
            <li key={i}>
              <strong>Id </strong>: {d.id}
              <br />
              <strong>Name</strong>: {d.name}
              <br />
              <strong>Email</strong>: {d.email}
              <br />
              <strong>Password</strong>: {d.password}
              <br />
              <strong>Gender</strong>: {d.gender}
              <br />
              <strong>Account type</strong> : {d.role}
            </li>
          ))}
        </ul>
      )}

      {!editMode && (
        <button
          className="btn btn-success ms-5 mt-4"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default Profile;
