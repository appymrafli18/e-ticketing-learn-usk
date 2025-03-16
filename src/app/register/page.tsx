"use client";
import { ErrorAxios } from "@/lib/axios-error";
import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { REGISTER } from "@/types/user";
import FormComponent from "@/components/form/FormComponent";
import InputField from "@/components/input/InputField";
import axios from "axios";

const Page = () => {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: REGISTER = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (data: REGISTER) => {
    setErrorMessage({});
    setLoading(true);
    console.log("submitted:", data);

    try {
      const response = await axios.post("/api/auth/register", data);

      if (response.status === 201) {
        toast.success("Berhasil Register");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>

          <FormComponent<REGISTER>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonLoading={loading}
            submitLabel="Sign Up"
            buttonStyle="w-full mt-2"
          >
            {({ formData, handleChange }) => (
              <>
                <InputField
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  errors={errorMessage?.name}
                  required
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Masukkan Nama Kamu"
                />
                <InputField
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  errors={errorMessage?.username}
                  required
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Masukkan Username Kamu"
                />
                <InputField
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  errors={errorMessage?.email}
                  required
                  type="email"
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Masukkan Email Kamu"
                />
                <InputField
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  errors={errorMessage?.password}
                  required
                  type="password"
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Masukkan Password Kamu"
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  errors={errorMessage?.confirmPassword}
                  required
                  type="password"
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Masukkan Confirm Password Kamu"
                />
              </>
            )}
          </FormComponent>

          <div className="mt-4 text-center text-sm text-gray-600">
            Dont have an account?
            <Link
              href="/login"
              className="text-indigo-600 ml-1 hover:text-indigo-500 font-medium"
            >
              Sign In
            </Link>
          </div>

          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
