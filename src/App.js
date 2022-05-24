import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import FavouriteBook from "./screens/FavouriteBook";
import BookDetails from "./screens/BookDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/favourite-book" element={<FavouriteBook/>} />
        <Route exact path="/book-details/:id/:page" element={<BookDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
