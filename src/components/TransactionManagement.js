import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({
    id: "",
    memberId: "",
    bookId: "",
    borrowDate: "",
    returnDate: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchBooks();
    fetchMembers();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      await axios.post("http://localhost:8080/api/transactions", currentTransaction);
      fetchTransactions();
      setOpenAddDialog(false);
      setCurrentTransaction({
        id: "",
        memberId: "",
        bookId: "",
        borrowDate: "",
        returnDate: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleEditTransaction = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/transactions/${currentTransaction.id}`,
        currentTransaction
      );
      fetchTransactions();
      setOpenEditDialog(false);
      setCurrentTransaction({
        id: "",
        memberId: "",
        bookId: "",
        borrowDate: "",
        returnDate: "",
      });
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const openEditForm = (transaction) => {
    setCurrentTransaction(transaction);
    setOpenEditDialog(true);
  };

  const getBookNameById = (id) => {
    const book = books.find((book) => book.id === id);
    return book ? book.title : "Unknown Book";
  };

  const getMemberNameById = (id) => {
    const member = members.find((member) => member.id === id);
    return member ? member.name : "Unknown Member";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-5/6 p-8 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transaction Management</h1>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpenAddDialog(true)}
          >
            + Add Transaction
          </button>
        </header>

        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Member Name</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Borrow Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{getMemberNameById(transaction.memberId)}</TableCell>
                  <TableCell>{getBookNameById(transaction.bookId)}</TableCell>
                  <TableCell>{transaction.borrowDate}</TableCell>
                  <TableCell>{transaction.returnDate}</TableCell>
                  <TableCell>
                    {/* <IconButton onClick={() => openEditForm(transaction)}>
                      <Edit />
                    </IconButton> */}
                    <IconButton onClick={() => deleteTransaction(transaction.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination count={10} color="primary" />
        </div>

        {/* Add Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Member</InputLabel>
              <Select
                value={currentTransaction.memberId}
                onChange={(e) =>
                  setCurrentTransaction({ ...currentTransaction, memberId: e.target.value })
                }
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Book</InputLabel>
              <Select
                value={currentTransaction.bookId}
                onChange={(e) =>
                  setCurrentTransaction({ ...currentTransaction, bookId: e.target.value })
                }
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Borrow Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentTransaction.borrowDate}
              onChange={(e) =>
                setCurrentTransaction({ ...currentTransaction, borrowDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Return Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentTransaction.returnDate}
              onChange={(e) =>
                setCurrentTransaction({ ...currentTransaction, returnDate: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddTransaction} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Member</InputLabel>
              <Select
                value={currentTransaction.memberId}
                onChange={(e) =>
                  setCurrentTransaction({ ...currentTransaction, memberId: e.target.value })
                }
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Book</InputLabel>
              <Select
                value={currentTransaction.bookId}
                onChange={(e) =>
                  setCurrentTransaction({ ...currentTransaction, bookId: e.target.value })
                }
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Borrow Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentTransaction.borrowDate}
              onChange={(e) =>
                setCurrentTransaction({ ...currentTransaction, borrowDate: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Return Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentTransaction.returnDate}
              onChange={(e) =>
                setCurrentTransaction({ ...currentTransaction, returnDate: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditTransaction} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TransactionManagement;