import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Books from "./components/Books";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;