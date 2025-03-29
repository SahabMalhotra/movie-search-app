import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieSearchApp from "./MovieSearchApp";
import MovieDetails from "./MovieDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearchApp />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
