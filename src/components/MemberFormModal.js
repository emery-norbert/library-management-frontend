import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const MemberFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { name: "", membershipType: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: "", membershipType: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Member" : "Add Member"}</DialogTitle>
      <DialogContent className="flex flex-col space-y-4">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Membership Type"
          name="membershipType"
          value={formData.membershipType}
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

export default MemberFormModal;