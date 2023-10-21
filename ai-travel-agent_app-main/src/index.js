import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import History from './History';
import Profile from './Profile';

import './index.css'
 

const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/app', element: <App /> },
  {path: '/login', element: <Login /> },
  {path: '/register', element: <Register /> },
  {path: '/history', element: <History /> },
  {path: '/profile', element: <Profile /> }

]); 
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);