import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { imdbID } = useParams(); // Get the imdbID from the URL params
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie details when the component mounts or imdbID changes
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${imdbID}&apikey=9c2c87ac`)
      .then((response) => {
        setMovieDetails(response.data); // Save the response data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [imdbID]);

  // Handle the back button click
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Render the loading message or movie details
  return (
    <div>
      <h1>Movie Details</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        movieDetails && (
          <div className="movie-details">
            <h2>
              {movieDetails.Title} ({movieDetails.Year})
            </h2>
            <div className="detail-image">
              <img
                src={movieDetails.Poster}
                alt={movieDetails.Title}
                className="movie-poster"
              />
            </div>

            <p>
              <strong>Genre:</strong> {movieDetails.Genre}
            </p>
            <p>
              <strong>Released:</strong> {movieDetails.Released}
            </p>
            <p>
              <strong>Director:</strong> {movieDetails.Director}
            </p>
            <p>
              <strong>Actors:</strong> {movieDetails.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {movieDetails.Plot}
            </p>
            <p>
              <strong>IMDB Rating:</strong> {movieDetails.imdbRating}
            </p>
            <p>
              <strong>Runtime:</strong> {movieDetails.Runtime}
            </p>
          </div>
        )
      )}
      <button className="back" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}

export default MovieDetails;
