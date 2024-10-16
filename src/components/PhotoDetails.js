import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPhotoDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_API_KEY}`);
      setPhoto(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching photo details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoDetails();
  }, []);

  if (loading) {
    return <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading...</div>
            </div>;
  }

  if (!photo) {
    return <p>Photo not found</p>;
  }


  return (
    <div className="photo-detail">
       <Link to="/" className="home-button">
        Home
      </Link>
      <img
        src={photo.urls.full} 
        alt={photo.alt_description}
        width={photo.width}  
        height={photo.height}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <h2>Title: {photo.description || "Untitled"}</h2>
      <p>Author: {photo.user.name}</p>
      <p>Description: {photo.alt_description || "No description available"}</p>
    </div>
  );
};

export default PhotoDetails;
