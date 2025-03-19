"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useMe from "@/store/me";

const LayoutDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, setUser } = useMe();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await setUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return (window.location.href = "/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <div className="flex-1 overflow-x-hidden">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
