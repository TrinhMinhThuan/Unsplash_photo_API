import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles.css";


const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const fetchPhotos = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/photos?page=${page}&client_id=${process.env.REACT_APP_API_KEY}`);
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      };
      fetchPhotos();
      
    } catch (error) {
      console.error("Error fetching photos", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-item">
          <Link to={`/photos/${photo.id}`}>
            <img src={photo.urls.full} alt={photo.alt_description} />
          </Link>
          <span>{photo.user.name}</span>
        </div>
      ))}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
