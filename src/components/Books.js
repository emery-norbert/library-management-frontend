import React, { useState, useEffect } from "react";
import { api } from "../api/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async () => {
    try {
      await api.post("/books", { title, author, category });
      fetchBooks();
      setTitle("");
      setAuthor("");
      setCategory("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Books</h2>
      
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm"
        />
        <button
          onClick={addBook}
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      <div className="mt-4">
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
              <div>
                <strong className="text-xl">{book.title}</strong> by <span className="text-gray-600">{book.author}</span> (Category: {book.category})
              </div>
              <button
                onClick={() => deleteBook(book.id)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;
