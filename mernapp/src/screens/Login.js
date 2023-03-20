
import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({    
    email: '',  
    password:''
  });
let navigate=useNavigate()
  const handleSubmit = async(event) => {
    event.preventDefault();
   const response= await axios.post('http://localhost:5000/api/loginuser', formData)
        console.log("valid credentials: "+response.data.authToken);
        localStorage.setItem("userEmail",formData.email)
        localStorage.setItem("authToken",response.data.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate('/')
      
  };

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
    <div className='container m-5'>
    <form onSubmit={handleSubmit}>
    
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={formData.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={formData.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/createuser" className='btn btn-danger m-3'>New User</Link>

</form>
</div>
    </>
  );
}

