import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=9c2c87ac`)
        .then((response) => {
          setMovies(response.data.Search || []); // Store the movies in state
          setLoading(false);
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
      <div>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
        />
        <button onClick={handleSearch}>Search</button> {/* Search button */}
      </div>
      {loading && <p>Loading...</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default MovieSearchApp;
