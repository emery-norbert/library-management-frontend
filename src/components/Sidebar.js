import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-purple-700 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Library Admin</h2>
      <nav className="space-y-4">
        <Link to="/books" className="block hover:text-gray-300">Books</Link>
        <Link to="/members" className="block hover:text-gray-300">Members</Link>
        <Link to="/transactions" className="block hover:text-gray-300">Transactions</Link>
      </nav>
    </div>
  );
};

export default Sidebar;