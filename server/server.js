// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");  

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true, 
  })
);
 

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

 
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "we need token please provide it." });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key",(err,decode) => {
      if(err)
      {
        return res.json({Message: "Authenticate Error."})
      }
      else{
        req.name = decode.name;
        req.id = decode.id;
        req.email = decode.email;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({Status: "Success", name: req.name, id: req.id, email: req.email})
});

app.get('/logout', (req, res)=>{
  res.clearCookie('token');
  return res.json({Status: "Success"})
})

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Message: "Server Side Error" });
    if (data.length > 0) {
      const name = data[0].name;
      const id = data[0].id;
      const email = data[0].email;
      const token = jwt.sign({ name, id,email }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      res.header("Access-Control-Allow-Credentials", "true");
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "Invalid Email or password, Please Try again" });
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists in the database
  const checkEmailQuery = "SELECT * FROM login WHERE email = ?";
  db.query(checkEmailQuery, [email], (checkErr, checkData) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).json({ Message: "Server Side Error" });
    }

    if (checkData.length > 0) {
      return res.status(400).json({ Message: "Email already registered" });
    } else {
      const insertQuery = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
      db.query(insertQuery, [name, email, password], (insertErr, insertData) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ Message: "Server Side Error" });
        }
        
        const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
          expiresIn: "1d",
        });
        
        res.cookie("token", token);
        res.header("Access-Control-Allow-Credentials", "true");
        return res.status(201).json({ Status: "Success" });
      });
    }
  });
});





app.post("/insertHistory", (req, res) => {
  const {
    destination,
    hotel_area,
    start_date,
    duration,
    activities,
    dates_and_places,
    budget,
    dont_like,
    addbyid,
    addbyname
  } = req.body;

  const sql =
    "INSERT INTO history (destination, hotel_area, start_date, duration, activities, dates_and_places, budget, dont_like,addbyid,addbyname) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";

  db.query(
    sql,
    [
      destination,
      hotel_area,
      start_date,
      duration,
      activities,
      dates_and_places,
      budget,
      dont_like,
      addbyid,
      addbyname
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Message: "Server Side Error" });
      } 
      return res.json({ Status: "Success" });
    }
  );
});


app.get("/Gethistory", verifyUser, (req, res) => {
  
  const userId = req.id; // Assuming that req.id contains the user's ID
  const sql = "SELECT * FROM history WHERE addbyid = ?";
  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server Side Error" });
    }
    
    return res.status(200).json(rows);
  });
});



app.get("/getUserData", verifyUser, (req, res) => {
  const userId = req.id;
  const sql = "SELECT name, id, password, email FROM login WHERE id = ?";
  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server Side Error" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ Message: "User not found" });
    }
    return res.status(200).json(rows[0]);
  });
});


app.get("/updateProfile", verifyUser, (req, res) => {

  const userId = req.id; // Assuming that req.id contains the user's ID
  const updatedData = req.body;
  const sql = "UPDATE login SET ? WHERE id = ?";
  db.query(sql, [updatedData, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server Side Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ Message: "User not found" });
    }
    return res.status(200).json({ Message: "User data updated successfully" });
  });
});


app.post("/updateProfile", verifyUser, (req, res) => {
  const { email, password } = req.body;
  const userId = req.id;

  const sql = "UPDATE login SET email = ?, password = ? WHERE id = ?"; // Fix the SQL syntax

  db.query(sql, [email, password, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server Side Error" }); // Use res.status instead of res.json for error responses
    }
    return res.status(200).json({ Status: "Success" }); // Use res.status for success responses
  });
});





app.listen(8081, () => { //sayem
  console.log("Running");
});

