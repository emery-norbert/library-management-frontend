import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/users">Users</Link>
      <Link to="/books">Books</Link>
      <Link to="/transactions">Transactions</Link>
    </nav>
  );
};

export default Navbar;
