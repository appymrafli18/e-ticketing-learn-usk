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
      <Sidebar user={user} />
      <div className="flex-1">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
