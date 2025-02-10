"use client";
import React, { useCallback, useEffect } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";

const AdminDashboard: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleCount = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/count");
      if (response.status === 200) {
        setCount(response.data.data);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    handleCount();
  }, [handleCount]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value={count.toString()}
          loading={loading}
        />
        <StatsCard title="Total Flights" value="567" loading={loading} />
        <StatsCard title="Total Revenue" value="$89,000" loading={loading} />
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
