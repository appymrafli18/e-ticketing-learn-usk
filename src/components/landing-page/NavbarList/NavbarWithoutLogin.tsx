"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NavbarWithoutLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 right-0 left-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="text-white text-2xl font-bold">E Ticketing</div>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <a href="#" className="text-white hover:text-gray-200">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Contact
          </a>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link
            href="/login"
            className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-600"
          >
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center py-4 min-h-screen">
          <a
            href="#"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white py-2 hover:border-solid hover:border-white border-b-2 border-transparent transition-all duration-300"
          >
            Contact
          </a>
          <Link
            href="/login"
            className="text-white border border-white px-4 py-2 w-full text-center rounded mt-2 hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarWithoutLogin;
