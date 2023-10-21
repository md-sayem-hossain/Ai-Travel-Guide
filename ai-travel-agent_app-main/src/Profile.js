import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });





  useEffect(() => {
    // Make a GET request to fetch user data
    axios
      .get("http://localhost:8081/getUserData") // Updated API endpoint
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data from the server.");
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate("/");

  axios.defaults.withCredentials = true; 
  const onSubmit = async (data) => {
     
    axios
      .post("http://localhost:8081/updateProfile", data) //sayem
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/Profile");
          alert("Update Success");
        } else {
          alert(res.data.Message);
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <Layout>
        <div className="container mb-10 h-100">
          <div className="row">
            <div className="col-md-12" style={{width: "40rem",  margin: "auto"}}>
              <h1 className="text-center mb-4">User Profile</h1>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <form  onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input {...register("name", { required: true })}
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={userData.name}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input {...register("email", { required: true })}
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={userData.email}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input {...register("password", { required: true })}
                      type="text"
                      id="password"
                      name="password"
                      defaultValue={userData.password}
                      className="form-control" 
                    />
                  </div> 
                  <div className="form-group">
                    <button type="submit" className="mt-3 form-control btn btn-success">Update</button> 
                  </div> 
                </form>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
