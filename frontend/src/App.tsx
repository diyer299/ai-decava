import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SampleTable from "./pages/SampleTable";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/sample-table">Resources Table</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="home">
              <h1>Decava</h1>
              <p>Welcome to the Decava application.</p>
            </div>
          }
        />
        <Route path="/sample-table" element={<SampleTable />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
