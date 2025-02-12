"use client";

import { IAirlines } from "@/types/airlines";
import { ChangeEvent, useState } from "react";

interface IEditFlightsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: IAirlines) => void;
  loading: boolean;
  initialValue: IAirlines | null;
  title: string;
}

export default function EditFlights({
  isOpen,
  onClose,
  onSave,
  loading,
  initialValue,
  title,
}: IEditFlightsProps) {
  const [value, setValue] = useState(initialValue);

  if (!isOpen) return null;

  const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setValue((prev) => ({ ...prev, name: e.target.value } as IAirlines));
    }

    setValue(
      (prev) =>
        ({ ...prev, [e.target.name]: e.target.files![0] } as IAirlines)
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Edit {title}
        </h2>
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => onChangeValues(e)}
            name="name"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name . . ."
            value={value?.name}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Logo</label>
          <input
            type="file"
            onChange={(e) => onChangeValues(e)}
            name="logo"
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black dark:text-white text-opacity-70 focus:ring-2 focus:ring-blue-500"
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
            onClick={() => onSave(value as IAirlines)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
