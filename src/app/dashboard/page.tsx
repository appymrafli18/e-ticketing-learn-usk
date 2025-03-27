"use client";
import AdminDashboard from "@/components/AdminDashboard";
import LayoutDashboard from "@/components/LayoutDashboard";
import useMe from "@/store/me";
import React from "react";

const Page: React.FC = () => {
  const { user } = useMe();

  if (user?.role === "Admin")
    return (
      <LayoutDashboard>
        <AdminDashboard />
      </LayoutDashboard>
    );

  return <LayoutDashboard>Hello Maskapai</LayoutDashboard>;
};

export default Page;
