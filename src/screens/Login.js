import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const [crenditial, setcrenditial] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const HandleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({ name: crenditial.name, email: crenditial.email, password: crenditial.password, geolocation: crenditial.geolocation }))
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },//name: from bakend
            //it is a post method so we have to send it body too..
            body: JSON.stringify({ email: crenditial.email, password: crenditial.password })
        })
        const json = await response.json();
        console.log(json)
        if (!json.success) {
            alert("Not saved");
        }
        if (json.success) {
            localStorage.setItem("userEmail", crenditial.email)
            localStorage.setItem("authToken", json.authToken)
            navigate("/");
        }
    }
    //a function to change input value, pahle initial value rahe , jo likh rahe han usko value ke barbar krdo
    const onChange = (event) => {
        setcrenditial({ ...crenditial, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className="container">
                <form onSubmit={HandleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
                        <input type="email" className="form-control" name='email' value={crenditial.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
                        <input type="password" className="form-control" name='password' value={crenditial.password} id="exampleInputPassword1" onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/SignUp" className='m-3 '>I am a new user</Link>
                </form>
            </div>
        </>
    )
}

export default Login