"use client";
import FormComponent from "@/components/form/FormComponent";
import InputField from "@/components/input/InputField";
import { ErrorAxios } from "@/lib/axios-error";
import { LOGIN } from "@/types/user";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: LOGIN = {
    email: "",
    password: "",
  };

  const handleSubmit = async (data: LOGIN) => {
    setErrorMessage({});
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        toast.success("Berhasil Login");
        setTimeout(() => {
          window.location.reload();
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
            Sign In
          </h2>

          <FormComponent<LOGIN>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel="Login"
            buttonStyle="w-full"
            buttonLoading={loading}
          >
            {({ formData, handleChange }) => (
              <>
                <InputField
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Masukan email kamu"
                  required
                  errors={errorMessage?.email}
                  type="email"
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <InputField
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Masukan password kamu"
                  required
                  errors={errorMessage?.password}
                  type="password"
                  inputStyle="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />

                {errorMessage?.error && (
                  <div className="text-red-500 text-sm -mt-1">
                    {errorMessage.error}
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href=""
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </>
            )}
          </FormComponent>

          <div className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?
            <Link
              href="/register"
              className="text-indigo-600 ml-1 hover:text-indigo-500 font-medium"
            >
              Sign up
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
