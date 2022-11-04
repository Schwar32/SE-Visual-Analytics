import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Explore from "./pages/Explore";
import BirdIdentifyer from "./pages/BirdIdentifyer";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Explore />} /> x
          <Route path="BirdIndetifyer" element={<BirdIdentifyer />} />
          <Route path="About" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
