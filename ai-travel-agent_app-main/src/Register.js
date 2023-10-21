import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { Link } from "react-router-dom";

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate("/");
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/register", values) //sayem
      .then((res) => {
        if (res.status === 201 && res.data.Status === "Success") {
          console.log(res.data);
          navigate("/login");
        } else if (res.status === 400 && res.data.Message === "Email already registered") {
          alert("Email already registered. Please use a different email.");
        } else {
          alert("Registration failed. Please try again later.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Email already registered. Please use a different email.");
      });
  };
  

  return ( 
    <div id="login-form-wrap">
    <h2>Login</h2>
    <form id="login-form" onSubmit={handleSubmit}>
        <p>
            <input type="text" id="name" onChange={e => setValues({...values, name: e.target.value})} name="name" placeholder="name" required />
            <i className="validation">
                <span></span>
                <span></span>
            </i>
        </p>
        <p>
            <input type="email" id="email" onChange={e => setValues({...values, email: e.target.value})} name="email" placeholder="email" required />
            <i className="validation">
                <span></span>
                <span></span>
            </i>
        </p>
        <p>
            <input type="password" id="password" onChange={e => setValues({...values, password: e.target.value})} name="password" placeholder="password" required />
        </p>
        <p>
            <input type="submit" id="register" value="Register" />
        </p>
    </form>
    <div id="create-account-wrap">
        <p>
            Already have an account?
            <Link to="/Login"  style={{color: "blue", marginLeft: "10px"}}>Login Now</Link>
        </p>
    </div>
</div>

  );
}
