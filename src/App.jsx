import React from "react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Country from "./pages/Country";
import HomePage from "./pages/HomePage";

import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage path="/" />} />
        <Route
          path="/country/:title"
          element={<Country path="/country/:title" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
