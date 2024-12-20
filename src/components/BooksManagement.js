import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import BooksTable from "./BooksTable";
import BookFormModal from "./BookFormModal";

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:8080/api/books");
    setBooks(response.data);
  };

  const handleAddBook = async (book) => {
    if (editingBook) {
      await axios.put(`http://localhost:8080/api/books/${editingBook.id}`, book);
    } else {
      await axios.post("http://localhost:8080/api/books", book);
    }
    fetchBooks();
    setModalOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:8080/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Books Management</h1>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            + Add Book
          </button>
        </div>
        <BooksTable
          books={books}
          onEdit={(book) => {
            setEditingBook(book);
            setModalOpen(true);
          }}
          onDelete={handleDeleteBook}
        />
        <BookFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddBook}
          initialData={editingBook}
        />
      </div>
    </div>
  );
};

export default BooksManagement;
