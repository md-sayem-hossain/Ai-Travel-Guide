import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "./image/logo.png";
import back from "./image/chase-travel-notifiation.jpg";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  
    const location = useLocation();
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    axios.defaults.withCredentials = true;

    useEffect (() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                setName (res.data.name);
            }
            else{
                setAuth(false); 
                setMessage(res.data.message)
            }
        })
    }, [])
    const navigate = useNavigate("/");


    const handleLogout =() => {
        axios.get('http://localhost:8081/logout') //sayem
        .then(res => {
            if(res.data.Status === "Success")
            {
                navigate("/");  
                window.location.reload(true)            
            }
            else{
                alert("error");
            }
        }).catch(err=> console.log(err))
    }




  return (
    <> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
      <div className="flex flex-col justify-between min-h-full" style={{ background: back }}>
        <header className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link to="/">
                  <img alt="Logo" src={logo} style={{ width: "8rem" }} />
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <button
                  type="button"
                  id="open-menu-btn"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                
                {
                    auth ? 
                    ( 
                        <div style={{display: "flex", alignItems:  "center", }}>
                            {/* <p style={{marginTop: "1rem", marginRight: "1rem"}}>Hello {name} !</p> */}
                            <Link to="/profile" style={{textDecoration:"none", color: "black",fontWeight: "bold", marginRight:"10px"}}>
                                Profile
                            </Link>
                            <button className="btn btn-success"  onClick={handleLogout}>Logout</button>

                            <Link
                                to="/history"
                                style={{ background: "rgb(250, 212, 80)", color: "black", textDecoration: "none" }}
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                Check History
                            </Link>
                        </div>
                    )
                    :
                    (
                    <div>
                        <h1>{message}</h1>
                        <Link to="/login" className="btn btn-success" style={{ background: "rgb(250, 212, 80)", color: "black", textDecoration: "none", border: "none", color: "white" }}>Login</Link>
                    </div>               
                         )
                }
                {/* <Link
                  to="/app"
                  style={{ background: "rgb(250, 212, 80)", color: "black", textDecoration: "none" }}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Try it out!
                </Link> */}
              </div>
            </div>
          </div>
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right hidden" id="mobile-menu">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      id="close-menu-btn"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link
                    to="/app"
                    style={{ background: "rgb(250, 212, 80)", color: "black", textDecoration: "none" }}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Try it out!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>{props.children}</main>
      </div>

      <footer className="text-center py-3 bg-gray-800 px-3 w-full">
        <p className="text-sm text-gray-300 md:mt-0 md:order-1">&copy; 2023 Team Tourguy AI</p>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@2.11.8/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>  

    
    </>
    
  );
};

export default Layout;
