import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Photo from "./pages/Photo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos/:id" element={<Photo />} />
      </Routes>
    </Router>
  );
};

export default App;
