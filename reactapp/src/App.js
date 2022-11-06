import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import BirdIdentifyer from "./pages/BirdIdentifyer";
import About from "./pages/About";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/BirdIdentifyer" element={<BirdIdentifyer />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
