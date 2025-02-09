import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 min-h-screen p-4 bg-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-sidebar)]">
        E-Ticketing Admin
      </h1>
      <ul>
        <li className="mb-3">
          <Link
            href="/dashboard"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link
            href="/dashboard/manage-users"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Manage Users
          </Link>
        </li>
        <li className="mb-3">
          <Link
            href="/dashboard/manage-maskapai"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Manage Maskapai
          </Link>
        </li>
        <li className="mb-3">
          <Link
            href="/admin/flights"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Manage Flights
          </Link>
        </li>
        <li className="mb-3">
          <Link
            href="/dashboard/manage-admin"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Manage Admin
          </Link>
        </li>
        <li className="mb-3">
          <Link
            href="/admin/reports"
            className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
          >
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
