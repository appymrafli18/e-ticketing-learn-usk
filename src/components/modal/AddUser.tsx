"use client";

import { USER } from "@/types/user";
import { ChangeEvent, useState } from "react";

interface IEditUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: USER) => void;
  loading: boolean;
  title: string;
}

export default function AddUser({
  isOpen,
  onClose,
  onSave,
  loading,
  title,
}: IEditUserProps) {
  const [value, setValue] = useState<USER>({
    name: "",
    username: "",
    email: "",
    role: "USER",
    password: "",
  });

  if (!isOpen) return null;

  const onChangeValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value } as USER));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Add {title}
        </h2>
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="name"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name . . ."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="username"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Username . . ."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="email"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email . . ."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <select
            name="role"
            onChange={(e) => onChangeValues(e)}
            value={value?.role}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="MASKAPAI">MASKAPAI</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            onChange={(e) => onChangeValues(e)}
            name="password"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Password . . ."
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onSave(value as USER)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
