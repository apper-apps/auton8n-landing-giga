import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;