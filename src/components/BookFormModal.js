import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const BookFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { title: "", author: "", category: "", availability: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ title: "", author: "", category: "", availability: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent className="flex flex-col space-y-4">
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookFormModal;