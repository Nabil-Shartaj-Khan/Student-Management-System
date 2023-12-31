const validation=(values)=>{
    let error={}
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if(values.email===""){
        error.email="Email can't be empty"
    }
    else if (!emailPattern.test(values.email)){
        error.email="This is not an email. Please check the format!"
    }
    else{
        error.email=""
    }

    if(values.password===""){
        error.password="Password can't be empty"
    }
    else if (!passwordPattern.test(values.password)){
        error.password="Password must be minimum length of 8 characters and atleast have one lowercase, uppercase and a digit!"
    }
    else{
        error.password=""
    }

    return error; 


}

export default validation;