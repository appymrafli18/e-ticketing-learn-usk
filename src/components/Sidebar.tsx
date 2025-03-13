import React from "react";
import Link from "next/link";
import { USER } from "@/types/user";

const listSidebar = [
  {
    url: "/dashboard",
    title: "Home",
    allowedRoles: ["ADMIN", "USER", "MASKAPAI"],
  },
  {
    url: "/dashboard/manage-users",
    title: "Manage Users",
    allowedRoles: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-maskapai",
    title: "Manage Maskapai",
    allowedRoles: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-airlines",
    title: "Manage Airlines",
    allowedRoles: ["ADMIN", "MASKAPAI"],
  },
  {
    url: "/dashboard/manage-admin",
    title: "Manage Admin",
    allowedRoles: ["ADMIN"],
  },
  {
    url: "/dashboard/manage-flight",
    title: "Flight",
    allowedRoles: ["ADMIN", "MASKAPAI"],
  },
  {
    url: "/dashboard/manage-payment",
    title: "Payments",
    allowedRoles: ["ADMIN", "USER"],
  },
  {
    url: "/dashboard/manage-booking",
    title: "Booking",
    allowedRoles: ["ADMIN", "MASKAPAI", "USER"],
  },
];

const Sidebar: React.FC<{ user?: USER | null }> = ({ user }) => {
  return (
    <div className="w-64 min-h-screen p-4 bg-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-sidebar)]">
        E-Ticketing
      </h1>
      <ul>
        {listSidebar
          .filter((item) => user?.role && item.allowedRoles.includes(user.role))
          .map((values, index) => (
            <li className="mb-3" key={index}>
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
