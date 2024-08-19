// src/components/MobileScreen.js

import React, { useState } from "react";
import uploadFileToS3 from "../utils/uploadFileToS3"; // Import the function to upload files to S3
import CircularProgress from '@mui/material/CircularProgress';

const MobileScreen = ({ handleChange }) => {
  const [mobileUploadedImageUrl, setMobileUploadedImageUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const uploadedMobileImageUrls = [];

    if (files.length > 3) {
      alert("Maximum 3 files allowed.");
      return;
    }

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadFileToS3(file);
        uploadedMobileImageUrls.push(imageUrl);
      }

      handleChange({
        target: {
          name: "mobileScreenshots",
          value: uploadedMobileImageUrls,
        },
      });

      setMobileUploadedImageUrl(uploadedMobileImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mobileScreenshots p-4">
      <label htmlFor="mobileScreenshots" className="block text-[3vw] md:text-[1.2vw] font-medium text-white mb-2">
        Please upload 3 Mobile App UI screenshots here * 
      </label>
      <input
        type="file"
        id="mobileScreenshots"
        name="mobileScreenshots"
        multiple
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
        required
        className="flex w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-yellow-500 file:text-white
        hover:file:bg-violet-100"
      />
      {isUploading && (
        <div className="flex justify-center mt-4">
          <CircularProgress sx={{ color: "#eab308" }} />
        </div>
      )}
      {mobileUploadedImageUrl.length > 0 && !isUploading && (
        <div className="uploadedImages grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {mobileUploadedImageUrl.map((url, index) => (
            <div key={index} className="uploadedImage">
              <img src={url} alt={`Uploaded ${index}`} className="w-full h-[16vw] object-contain rounded-lg shadow-md" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileScreen;
