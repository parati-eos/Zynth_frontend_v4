/*global userID, submissionId */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../helper/loader";
function ReviewResponses() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("userEmail") || "");
  const storedSubmissionId = localStorage.getItem("submissionId");
  const [submissionId, setSubmissionId] = useState(12345 || "");
  const [loading, setLoading] = useState(false);
  var SID = 0;
  const fetchDataFromGoogleSheet = async () => {
    const apiUrl = "https://pitchdeck-server.onrender.com/submissionID";
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "/",
          "x-userId": userID,
        },
      });
      const data = await response.json();
      SID = data.submissionID;
      console.log("SID value >>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(SID);
      setSubmissionId(data.submissionID);
      localStorage.removeItem("slidesData");
      localStorage.removeItem("slidesId");
      localStorage.setItem("submissionId", data.submissionID);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const presentationBuilderURL =
    "https://script.google.com/macros/s/AKfycbwQkIxf4uL0yUKnzFTEBexWzJMhsv7lFbiyw_W8wI3M3XDjv2E-LwPjpNktRVG_5bA/exec";
  const handleButtonClick = () => {
    if (submissionId && userID) {
      const urlWithParams = `${presentationBuilderURL}?userID=${userID}&submissionID=${SID}`;
      window.location.href = urlWithParams;
      setTimeout(() => {
        navigate("/pages/presentationcheck");
      }, 3000);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDataFromGoogleSheet(); // Fetch data first
        handleButtonClick(); // Then handle button click
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <div>
      <LoadingPage />
    </div>
  );
}
export default ReviewResponses;
