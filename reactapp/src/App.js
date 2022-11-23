import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import BirdIdentifyer from "./pages/BirdIdentifyer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/BirdIdentifyer" element={<BirdIdentifyer />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
