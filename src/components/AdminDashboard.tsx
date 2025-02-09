import React from "react";
import StatsCard from "./StatsCard";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Users" value="1,234" />
        <StatsCard title="Total Flights" value="567" />
        <StatsCard title="Total Revenue" value="$89,000" />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="bg-[var(--foreground)] p-6 rounded-lg shadow-md">
          <ul>
            <li className="border-b py-2">User John Doe booked a flight.</li>
            <li className="border-b py-2">Flight XYZ123 was added.</li>
            <li className="border-b py-2">Revenue increased by 15%.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
