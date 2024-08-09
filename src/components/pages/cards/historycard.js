import React, { useState } from "react";
import "./historycard.css";
import { useNavigate } from "react-router-dom";
import ShareButton from "../js/Share.js";
import ExportButton from "../js/export.js";
import EditButton from "../js/edit.js";


function getSheetIdFromUrl(url) {
  const match = url.match(/\/d\/(.+?)\/|\/open\?id=(.+?)(?:&|$)/);
  return match ? (match[1] || match[2]) : null;
}

const HistoryCard = ({ userID, submissionID, PPTName, Date, link }) => {
  const [editableName, setEditableName] = useState(PPTName);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  link = getSheetIdFromUrl(link)
  // const handleHistoryCardClicked = () => {
  //   window.open(`/share?submissionId=${submissionID}`, '_blank');
  // };
  const handleHistoryCardClicked = () => {
    navigate(`/presentationedit?submissionID=${submissionID}&generatedPresentationId=${link}`);
  };
  

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
  };
  const checkPaymentStatusAndProceed = async () => {
    try {
      const response = await fetch(`http://localhost:5000/slides/url?formId=${submissionID}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API response data:", data); // Debugging line
  
      if (data && data.paymentStatus === 1) {
        // Payment has already been made, run handleDownload
        handleDownload();
      } else if (data && data.paymentStatus === 0) {
        // Payment is not made, open the payment gateway
        document.getElementById('payment-button').click();
      } else {
        alert("Unable to determine payment status.");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      alert("Error checking payment status. Please try again.");
    }
  };


  const handleDownload = async () => {
    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/slides/url?formId=${submissionID}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      const url = result.PresentationURL;
  
      if (!url || typeof url !== "string") {
        throw new Error("Invalid URL in response");
      }
  
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error exporting presentation:", error);
      alert(
        "Oops! It seems like the pitch deck presentation is missing. Please try again later."
      );
    }
  };

  const handleShare = () => {
    const uniqueShareableUrl = `https://zynth.ai/share?submissionId=${submissionID}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Share Presentation",
          text: "Check out this presentation",
          url: uniqueShareableUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed: ", error));
    } else if (navigator.clipboard && navigator.platform.includes("Mac")) {
      // For macOS devices where navigator.share is not available
      navigator.clipboard
        .writeText(uniqueShareableUrl)
        .then(() => alert("URL copied to clipboard"))
        .catch((error) => console.error("Copy failed: ", error));
    } else {
      // For other devices where neither navigator.share nor clipboard API is available
      alert("Sharing is not supported on this device/browser.");
    }
  };


  const handleSave = async () => {
    setIsEditing(false);

    const requestBody = {
      userID: userID,
      formID: submissionID,
      newColumnValue: editableName,
    };

    try {
      const serverurl = process.env.REACT_APP_SERVER_URL;
      const response = await fetch(`${serverurl}/updateRow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Row updated successfully");
        alert("Row updated successfully");
      } else {
        console.error("Failed to update row");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="card">
          <div className="card-image" onClick={handleHistoryCardClicked}>
            <iframe
              src={`https://docs.google.com/presentation/d/${link}/embed?rm=minimal&start=true&loop=true`}
            />
          </div>
        <div className="card-content">
          <div className="card-header">
            {isEditing ? (
              <input
                type="text"
                value={editableName}
                onBlur={handleSave}
                onChange={handleNameChange}
              />
            ) : (
              <h2 onClick={() => setIsEditing(true)}>
                Name: <span>{editableName}</span>
              </h2>
            )}
          </div>
          <h2>
            Date Created: <span>{Date}</span>
          </h2>
          <div className="card-buttons">
          <EditButton onClick={handleHistoryCardClicked}/>
          <ShareButton onClick={handleShare}/>
          <ExportButton onClick={checkPaymentStatusAndProceed}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
