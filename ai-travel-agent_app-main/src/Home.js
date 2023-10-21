import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import heroImage from "./image/asda2.png";
import sectionImage from "./image/4823404.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
// import background from './image/background.png'

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8081").then((res) => { //sayem
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.message);
      }
    });
  }, []);

  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert("Thanks for signing up!");
        setEmail("");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={heroImage}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              style={{ width: "100%" }}
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Welcome to{" "}
              <span style={{ color: "rgb(250, 212, 80)" }}>TOURGUY AI.</span>
            </h1>
            <p className="lead">
              An AI-driven travel agent that assists you in planning and
              organizing your travel itineraries through natural language
              interactions.
            </p>
            <div
              clasnpm
              startsName="d-grid gap-2 d-md-flex justify-content-md-start"
            >
              {auth ? (
                <Link
                  to="/app"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                  style={{ background: "rgb(250, 212, 80)", border: "none" }}
                >
                  Try it Out!
                </Link>
              ) : (
                <button type="button" onClick={() => alert('Please Login First')} className="btn btn-primary btn-lg px-4 me-md-2" style={{background: "rgb(250, 212, 80)", border: "none"}}>Try it Out!</button>
              )}

              <p style={{ marginTop: "1rem" }}>
                Trusted by 10 million businesses worldwide!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="p-5 text-center bg-body-tertiary">
          <div className="container py-5">
            <h1 className="text-body-emphasis">
              Revolutionize Your Travel Planning with AI-Powered Assistance
            </h1>
            <p className="col-lg-8 mx-auto lead">
              Planning your dream vacations just got easier and more efficient
              with our AI-powered travel agent. Say goodbye to complex booking
              processes and hello to natural language travel planning.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={sectionImage}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              style={{ borderRadius: "10px" }}
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Streamline Your Travel Itinerary Creation with AI Technology
            </h1>
            <p className="lead">
              Let our AI travel agent take the stress out of trip planning.
              Using conversational language, it helps you effortlessly create
              and schedule your travel itinerary, making your journey smoother
              and more enjoyable.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 py-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl tracking-tight font-bold text-gray-800 sm:text-4xl sm:tracking-tight">
            <span className="block">
              Ready to start planning your next trip?
            </span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Join the waitlist and we will get in touch.
          </p>
          <form
            onSubmit={handleSubmit}
            className=" form-group mt-8 flex flex-col sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              style={{ width: "20rem" }}
              placeholder="Enter your email"
              required
            />{" "}
            <br />
            <button type="submit" className="btn btn-secondary ">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
