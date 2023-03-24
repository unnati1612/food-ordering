
import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    location:''
  });
  let navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/createuser', formData)
      .then(res => {
        console.log(res.data);
        navigate('/login')
        
      })
      .catch(err => {
        alert('invalid')

        console.log("error is: "+err);
      });

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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={formData.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={formData.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={formData.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputLocation" className="form-label">Address</label>
    <input type="text" className="form-control" name='location' value={formData.location}  onChange={onChange} id="exampleInputLocation"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/login" className='btn btn-danger m-3'>Already a User</Link>
</form>
</div>
    </>
  );
}

