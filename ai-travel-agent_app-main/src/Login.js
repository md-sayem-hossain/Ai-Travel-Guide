import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './style.css'; // Import the local CSS module

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate("/");
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", values) //sayem
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/app");
        } else {

          alert(res.data.Message);
          
        }
      })
      .catch((err) => console.log(err));
  };
 


  return (
     
    <div id="login-form-wrap">
    <h2>Login</h2>
    <form id="login-form" onSubmit={handleSubmit}>
        <p>
            <input type="email" id="email" onChange={e => setValues({...values, email: e.target.value})} name="email" placeholder="Email" required />
            <i class="validation">
                <span></span>
                <span></span>
            </i>
        </p>
        <p>
            <input type="password" id="password" onChange={e => setValues({...values, password: e.target.value})} name="password" placeholder="Password" required />
        </p>
        <p>
            <input type="submit" id="login" value="Login" />
        </p>
    </form>
    <div id="create-account-wrap">
        <p>
            Not a member?
            <Link to="/Register" style={{color: "blue", marginLeft: "10px"}}>Create Account</Link>
        </p>
    </div>
</div>

  );
}
