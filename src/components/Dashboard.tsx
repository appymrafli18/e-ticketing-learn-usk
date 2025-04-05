"use client";
import React, { useCallback, useEffect } from "react";
import StatsCard from "./StatsCard";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import useMe from "@/store/me";

interface ICount {
  count_user?: number;
  count_booking: number;
  count_flights: number;
  count_revenue: number;
}

const AdminDashboard: React.FC = () => {
  const [count, setCount] = React.useState<ICount>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useMe();

  const handleView = useCallback(async () => {
    setLoading(true);

    try {
      if (user && user.role !== "User") {
        const requests =
          user.role === "Admin"
            ? [
                axios.get("/api/user/count"),
                axios.get("/api/bookings/count"),
                axios.get("/api/flights/count"),
                axios.get("/api/payments/count"),
              ]
            : [
                null,
                axios.get("/api/bookings/count"),
                axios.get("/api/flights/count"),
                axios.get("/api/payments/count"),
              ];

        const [userCount, bookingCount, flightCount, revenueCount] =
          await Promise.all(requests);

        setCount({
          count_user: userCount?.data.data,
          count_booking: bookingCount!.data.data,
          count_flights: flightCount!.data.data,
          count_revenue: revenueCount!.data.data,
        });
      }
    } catch (error) {
      const err = ErrorAxios(error);
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    handleView();
  }, [handleView]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{user?.role} Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user?.role === "Admin" && count?.count_user && (
          <StatsCard
            title="Total Users"
            value={count.count_user.toString()}
            loading={loading}
          />
        )}
        {count?.count_booking && (
          <StatsCard
            title="Total Booking"
            value={count.count_booking.toString()}
            loading={loading}
          />
        )}
        {count?.count_flights && (
          <StatsCard
            title="Total Flights"
            value={count.count_flights.toString()}
            loading={loading}
          />
        )}
        {count?.count_revenue && (
          <StatsCard
            title="Total Revenue"
            value={count.count_revenue.toString()}
            loading={loading}
          />
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="dark:bg-[var(--foreground)] p-6 rounded-lg shadow-md">
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
