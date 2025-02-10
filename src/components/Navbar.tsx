"use client";
import { ErrorAxios } from "@/lib/axios-error";
import axios from "axios";
import React from "react";

const Navbar: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.status === 200) window.location.href = "/login";
    } catch (error) {
      const err = ErrorAxios(error);
      console.log(err);
    }
  };

  return (
    <nav className="shadow-md p-4 bg-[var--(background)] dark:bg-[var(--foreground)]">
      <div className="dark:text-[var(--text)] container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4">Admin</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
