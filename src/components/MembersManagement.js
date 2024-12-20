import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import MemberTable from "./MemberTable";
import MemberFormModal from "./MemberFormModal";

const MembersManagement = () => {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await axios.get("http://localhost:8080/api/members");
    setMembers(response.data);
  };

  const handleAddMember = async (member) => {
    if (editingMember) {
      await axios.put(`http://localhost:8080/api/members/${editingMember.id}`, member);
    } else {
      await axios.post("http://localhost:8080/api/members", member);
    }
    fetchMembers();
    setModalOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = async (id) => {
    await axios.delete(`http://localhost:8080/api/members/${id}`);
    fetchMembers();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Members Management</h1>
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            + Add Member
          </button>
        </div>
        <MemberTable
          members={members}
          onEdit={(member) => {
            setEditingMember(member);
            setModalOpen(true);
          }}
          onDelete={handleDeleteMember}
        />
        <MemberFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddMember}
          initialData={editingMember}
        />
      </div>
    </div>
  );
};

export default MembersManagement;