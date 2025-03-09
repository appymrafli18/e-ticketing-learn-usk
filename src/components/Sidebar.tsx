import React from "react";
import Link from "next/link";

const listSidebar = [
  {
    url: "/dashboard",
    title: "Home",
    roleRequired: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-users",
    title: "Manage Users",
    roleRequired: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-maskapai",
    title: "Manage Maskapai",
    roleRequired: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-airlines",
    title: "Manage Airlines",
    roleRequired: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-admin",
    title: "Manage Admin",
    roleRequired: ["ADMIN"],
  },
  {
    url: "/dashboard/admin-reports",
    title: "Reports",
    roleRequired: ["ADMIN", "MASKAPAI"],
  },
];

const Sidebar: React.FC<{ role: string }> = ({ role }: { role: string }) => {
  return (
    <div className="w-64 min-h-screen p-4 bg-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-sidebar)]">
        E-Ticketing Admin
      </h1>
      <ul>
        {listSidebar.map((values, index) => {
          if (values.roleRequired && !values.roleRequired.includes(role))
            return null;
          return (
            <li className={`mb-3`} key={index}>
              <Link
                href={values.url}
                className="text-[var(--text-sidebar)] hover:text-[var(--text-sidebar-hover)] block p-2 rounded"
              >
                {values.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
