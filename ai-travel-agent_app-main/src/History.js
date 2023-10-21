import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "./Layout"; 
 


const History = () => { 

  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Make a GET request to fetch history data
    axios
      .get("http://localhost:8081/Gethistory")
      .then((response) => {
        setHistoryData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data from the server.");
        setIsLoading(false);
      });
  }, []);
     
  return (
    <>
      <Layout> 

      <div className="container mb-10 h-100">
        <div className="row">
          <div className="col-md-12">

           
      <h1 className="text-center mb-4">History Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Destination</th>
              <th>Hotel Area</th>
              <th>Start Date</th>
              <th>Duration</th>
              <th>Activities</th>
              <th>Dates and Places</th>
              <th>Budget</th>
              <th>Don't Like</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((data) => (
              <tr key={data.id}>
                <td>{data.destination}</td>
                <td>{data.hotel_area}</td>
                <td>{data.start_date}</td>
                <td>{data.duration}</td>
                <td>{data.activities}</td>
                <td>{data.dates_and_places}</td>
                <td>{data.budget}</td>
                <td>{data.dont_like}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      
    </div>
        </div>

      </Layout>
    </>
  )
}

export default History;

 
 