"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
// import toast, { Toaster } from "react-hot-toast";
import BookingTable from "@/components/table/BookingTable";
import { ErrorAxios } from "@/lib/axios-error";
import { BOOKING } from "@/types/booking";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Page: React.FC = () => {
  const [data, setData] = useState<BOOKING[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  const initialData = useCallback(async () => {
    setLoading(true);
    setErrorMessage({});
    try {
      const response = await axios.get("/api/bookings/all");

      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      const err = ErrorAxios(error);

      if (typeof err === "object") {
        setErrorMessage(err as Record<string, string>);
      } else {
        setErrorMessage({ error: err });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div>{/* <Toaster position="top-right" reverseOrder={false} /> */}</div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bookings</h1>
          {/* <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white">
            Add Booking
          </button> */}
        </div>

        {data && (
          <BookingTable
            initialValues={data}
            loading={loading}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
