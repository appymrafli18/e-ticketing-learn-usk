"use client";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useMe from "@/store/me";

const LayoutDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, setUser } = useMe();

  useEffect(() => {
    setUser();
  }, [setUser]);

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user?.role ?? ""} />
      <div className="flex-1">
        <Navbar name={user?.name ?? ""} role={user?.role ?? ""} />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
