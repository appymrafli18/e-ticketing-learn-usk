import AdminDashboard from "@/components/AdminDashboard";
import LayoutDashboard from "@/components/LayoutDashboard";
import React from "react";

const Page: React.FC = () => {
  return (
    <LayoutDashboard>
      <AdminDashboard />
    </LayoutDashboard>
  );
};

export default Page;
