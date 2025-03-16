"use client";

import { USER } from "@/types/user";
import { ChangeEvent, useState } from "react";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";
import { SelectField } from "../input/SelectField";

interface IEditUserProps {
  isOpen: boolean;
  handleSubmit: (data: USER) => void;
  onClose: () => void;
  errorMessage: Record<string, string>;
  loading: boolean;
  title: string;
}

export default function AddUser({
  isOpen,
  handleSubmit,
  onClose,
  loading,
  errorMessage,
  title,
}: IEditUserProps) {
  if (!isOpen) return null;

  const initialValues: USER = {
    name: "",
    username: "",
    email: "",
    role: "User",
    password: "",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add {title}</h2>
        <FormComponent<USER>
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isCancel={true}
          buttonLoading={loading}
          onClose={onClose}
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="Name"
                name="name"
                onChange={handleChange}
                value={formData?.name}
                required
                errors={errorMessage?.name}
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <InputField
                label="Username"
                name="username"
                onChange={handleChange}
                value={formData?.username as string}
                errors={errorMessage?.username}
                required
                inputStyle="w-full"
                placeholder="Masukkan username"
              />
              <InputField
                label="Email"
                name="email"
                onChange={handleChange}
                value={formData?.email}
                required
                errors={errorMessage?.email}
                type="email"
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <InputField
                label="Password"
                name="password"
                onChange={handleChange}
                value={formData?.password as string}
                errors={errorMessage?.password}
                required
                type="password"
                inputStyle="w-full"
                placeholder="Masukkan Nama"
              />
              <SelectField
                label="Role"
                name="role"
                value={formData?.role}
                onChange={handleChange}
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "User", label: "User" },
                  { value: "Maskapai", label: "Maskapai" },
                ]}
                required
              />
            </>
          )}
        </FormComponent>
        {errorMessage && <p className="text-red-500">{errorMessage?.error}</p>}
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
}
