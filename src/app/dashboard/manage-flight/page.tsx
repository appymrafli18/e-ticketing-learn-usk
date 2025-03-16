"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import AddFlight from "@/components/modal/AddFlight";
import FlightTable from "@/components/table/FlightTable";
import { ErrorAxios } from "@/lib/axios-error";
import { FLIGHT } from "@/types/flight";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Page: React.FC = () => {
  const [data, setData] = useState<FLIGHT[]>([]);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const initialData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/flights/all");

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
          <h1 className="text-2xl font-bold">Manage Flights</h1>
          <button
            onClick={() => setIsAdd(true)}
            className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
          >
            Create
          </button>
        </div>
        <FlightTable initialValues={data} loading={loading} />

        {errorMessage && (
          <p className="text-center p-4">{errorMessage?.error}</p>
        )}
        {isAdd && (
          <AddFlight
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            loading={loading}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
