import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} width="200" />
    </div>
  );
}

export default MovieCard;
