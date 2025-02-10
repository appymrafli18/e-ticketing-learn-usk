import { USER } from "@/types/user";
import React from "react";

interface UserTableProps {
  users: USER[] | null;
  loading: boolean;
  onEdit: (selectUser: USER) => void;
  // onDelete?: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, onEdit }) => {
  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full shadow-md rounded-lg text-center">
        <thead className="border-b border-[var(--text)]">
          <tr>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {}}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && <div className="text-center">Loading...</div>}
    </div>
  );
};

export default UserTable;
