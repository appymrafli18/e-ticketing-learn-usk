import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const LayoutDashboard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
