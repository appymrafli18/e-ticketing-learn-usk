"use client";

import { ChangeEvent, useState } from "react";

interface IAirlines {
  name: string;
  logo: string;
  userId: number;
}

interface IAddAirlinesProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: IAirlines) => void;
  loading: boolean;
  userId: number;
}

export default function AddAirlines({
  isOpen,
  onClose,
  onSave,
  loading,
  userId,
}: IAddAirlinesProps) {
  const [value, setValue] = useState<IAirlines>({
    name: "",
    logo: "",
    userId: userId,
  });

  if (!isOpen) return null;

  const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Add Airlines
        </h2>
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="name"
            value={value.name}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Airlines Name..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Logo URL</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="logo"
            value={value.logo}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Logo URL..."
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
            disabled={loading || !value.name || !value.logo}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              (loading || !value.name || !value.logo) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onSave(value)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 