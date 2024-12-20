import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import LoginScreen from "./components/LoginScreen";
import TransactionManagement from "./components/TransactionManagement";
import MembersManagement from "./components/MembersManagement";
import BooksManagement from "./components/BooksManagement";
import SignUpScreen from "./components/SignupScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<SignUpScreen />} />
          <Route path="/books" element={<BooksManagement />} />
          <Route path="/members" element={<MembersManagement />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;