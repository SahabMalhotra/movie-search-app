import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams(); // Get the movie ID from the URL params
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${id}&apikey=YOUR_API_KEY`)
      .then((response) => {
        setMovieDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]); // Run the effect when the movie ID changes

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movieDetails) {
    return <p>Movie not found</p>;
  }

  return (
    <div>
      <h1>{movieDetails.Title}</h1>
      <h3>{movieDetails.Year}</h3>
      <p>{movieDetails.Genre}</p>
      <p>{movieDetails.Plot}</p>
      <img src={movieDetails.Poster} alt={movieDetails.Title} width="300" />
    </div>
  );
}

export default MovieDetail;
