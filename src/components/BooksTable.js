import React from "react";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const BooksTable = ({ books, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Book ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="px-4 py-2">#{book.id}</td>
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">{book.category}</td>
              <td className="px-4 py-2">
                <IconButton color="primary" onClick={() => onEdit(book)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(book.id)}>
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;