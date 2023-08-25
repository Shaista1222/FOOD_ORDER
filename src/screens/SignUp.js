import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
    const [crenditial, setcrenditial] = useState({ name: "", email: "", password: "", geolocation: "" })
    const HandleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({ name: crenditial.name, email: crenditial.email, password: crenditial.password, geolocation: crenditial.geolocation }))
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },//name: from bakend
            //it is a post method so we have to send it body too..
            body: JSON.stringify({ name: crenditial.name, email: crenditial.email, password: crenditial.password, location: crenditial.geolocation })
        })
        const json = await response.json();
        console.log(json)
        if (!json.success) {
            alert("Not saved")
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
                        <label htmlFor="exampleInputEmail1" className='form-label'>Name </label>
                        <input type="text" className="form-control" name='name' value={crenditial.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
                        <input type="email" className="form-control" name='email' value={crenditial.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
                        <input type="password" className="form-control" name='password' value={crenditial.password} id="exampleInputPassword1" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className='form-label'>Location  </label>
                        <input type="text" className="form-control" name='geolocation' value={crenditial.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 '>Already registered at tis platform</Link>
                </form>
            </div>
        </>
    )
}

export default SignUp