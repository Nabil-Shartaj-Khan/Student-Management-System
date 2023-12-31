import { Link } from "react-router-dom";
import { useState } from "react";
import validation from '../validation/Signupvalidation';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationErrors = validation(values);
        setErrors(validationErrors);
    
        if (Object.values(validationErrors).every(error => error === "")) {
            try {
                const response = await axios.post('http://localhost:5000/signup', values);
                navigate("/login");
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrorMessage("Email already exists! Use another email or login!"); 
                } else {
                    console.log(error); 
                }
            }
        }
    };

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="p-3">
                <form action="" className="border border-primary border-2 p-5 m-5 shadow-lg" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><b>Name:</b></label>
                        <input type="text" placeholder="Enter your name" className="form-control my-3 p-3" name="name" onChange={handleInput} />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><b>Email:</b></label>
                        <input type="email" placeholder="Enter your email" className="form-control my-3 p-3" name="email" onChange={handleInput} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><b>Password:</b></label>
                        <input type="password" placeholder="Enter your password" className="form-control my-3 p-3" name="password" onChange={handleInput} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="me-3"><b>Gender:</b></label>
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender" value="male" className="m-1" onChange={handleInput} />

                        <label htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="female" className="m-1" onChange={handleInput} /> <br></br>
                        {errors.gender && <span className="text-danger">{errors.gender}</span>}
                        {errorMessage && <span className="text-danger">{errorMessage}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register now</button>
                    <p className="lead mt-3">Have an account? You can Login here!</p>
                    <Link to="/login" className="btn btn-primary w-100 mt-2">Login</Link>
                </form>
            </div>
        </div>
    );
}


export default Registration;
