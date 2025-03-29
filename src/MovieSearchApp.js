import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(null); // Initialize with null instead of []
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // State to store error messages

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      setError(null); // Reset error before making the API call

     axios
       .get(
         `https://www.omdbapi.com/?s=${searchTerm}&apikey=9c2c87ac&type=movie`
       )
       .then((response) => {
         const searchResults = response.data.Search || [];

         // Fetch detailed info for each movie
         Promise.all(
           searchResults.map((movie) =>
             axios
               .get(
                 `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=9c2c87ac`
               )
               .then((res) => res.data)
           )
         ).then((detailedMovies) => {
           setMovies(detailedMovies); // Store the movies with full details
           setLoading(false);
         });
       })
       .catch((error) => {
         console.error(error);
         setLoading(false);
       });

    }
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} {/* Display error message */}
      <div className="movie-list">
        {movies
          ? movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          : !loading && !error && <p>Start searching for movies above.</p>}
      </div>
    </div>
  );
}

export default MovieSearchApp;
