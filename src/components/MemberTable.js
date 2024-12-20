import React from "react";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const MemberTable = ({ members, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2">
                <IconButton color="primary" onClick={() => onEdit(member)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(member.id)}>
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

export default MemberTable;