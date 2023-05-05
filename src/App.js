import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/home";
import Dashboard from "./Pages/Dashboard/dashboard";
import CoinPage from "./Pages/Coin/Coin";
import Compare from "./Pages/Compare";
import Watchlist from "./Pages/Watchlist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/coin/:id" element={<CoinPage />}></Route>
          <Route path="/compare" element={<Compare />}></Route>
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
