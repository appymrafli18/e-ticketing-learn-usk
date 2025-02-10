"use client";
import { ErrorAxios } from "@/lib/axios-error";
import { RegisterForm, userSchema } from "@/lib/validation-user";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const Page = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    console.log("submit data ...", data);
    setErrorMessage("");

    try {
      const response = await axios.post("/api/auth/register", data);
      if (response.status === 200) return (window.location.href = "/dashboard");
      console.log("BERHASIL LOGIN", response);
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign Up
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-indigo-300"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Dont have an account?
            <Link
              href="/login"
              className="text-indigo-600 ml-1 hover:text-indigo-500 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
