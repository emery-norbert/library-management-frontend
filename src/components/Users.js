import React, { useState, useEffect } from "react";
import { api } from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    try {
      await api.post("/auth/register", { username, password, role }); // Include role in the request
      fetchUsers();
      setUsername("");
      setPassword("");
      setRole(""); // Reset role input
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/auth/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Users Management</h2>

      {/* Add User Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-medium mb-4">Add New User</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            role="textbox"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            role="textbox"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            role="listbox"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          onClick={addUser}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          role="button"
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium mb-4">Users List</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Username</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Role</th>
              <th className="px-6 py-3 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">{user.username}</td>
                <td className="px-6 py-4 border-b border-gray-300">{user.role}</td> {/* Display role */}
                <td className="px-6 py-4 border-b border-gray-300">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                    role="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;