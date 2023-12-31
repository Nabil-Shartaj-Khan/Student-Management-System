const validation = (values) => {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (values.name === "") {
        error.name = "Name can't be empty";
    } else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = "Email can't be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Check your email again!";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password can't be empty";
    } else if (!passwordPattern.test(values.password)) {
        error.password = "Password must be a minimum length of 8 characters and have one lowercase, uppercase, and a digit!";
    } else {
        error.password = "";
    }

    if (!values.gender) {
        error.gender = "Please select a gender";
    } else {
        error.gender = "";
    }

    return error;
};

export default validation;
