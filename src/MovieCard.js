import React from "react";
import { useNavigate } from "react-router-dom";
function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="movie-image"
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
        style={{ cursor: "pointer" }} // Make it look clickable
      />

      <div className="movie-info">
        <h2>TITLE</h2>
        <p>{movie.Title}</p>
        <h2>Year</h2>
        <p className="movie-year">{movie.Year}</p>
        <h2>Rating</h2>
        <p className="movie-rated">{movie.imdbRating || "N/A"}</p>{" "}
      </div>
    </div>
  );
}

export default MovieCard;
