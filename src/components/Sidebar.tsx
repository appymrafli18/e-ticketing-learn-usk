import React from "react";
import Link from "next/link";

const listSidebar = [
  {
    url: "/dashboard",
    title: "Home",
    protect: false,
  },
  {
    url: "/dashboard/manage-users",
    title: "Manage Users",
    protect: false,
  },
  {
    url: "/dashboard/manage-maskapai",
    title: "Manage Maskapai",
    protect: false,
  },
  {
    url: "/dashboard/manage-flights",
    title: "Manage Flights",
    protect: false,
  },
  {
    url: "/dashboard/manage-admin",
    title: "Manage Admin",
    protect: false,
  },
  {
    url: "/dashboard/admin-reports",
    title: "Reports",
    protect: false,
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 min-h-screen p-4 bg-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-sidebar)]">
        E-Ticketing Admin
      </h1>
      <ul>
        {listSidebar.map((values, index) => (
          <li className={`mb-3 ${values.protect ? "hidden" : ""}`} key={index}>
            <Link
              href={values.url}
              className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
            >
              {values.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
