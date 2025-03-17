"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import AddFlight from "@/components/modal/AddFlight";
import EditFlight from "@/components/modal/EditFlight";
import FlightTable from "@/components/table/FlightTable";
import { ErrorAxios } from "@/lib/axios-error";
import { FLIGHT } from "@/types/flight";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page: React.FC = () => {
  const [data, setData] = useState<FLIGHT[]>([]);
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [selectedData, setSelectedData] = useState<FLIGHT>();
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
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

  const onEdit = (data: FLIGHT) => {
    setIsEdit(true);
    setSelectedData(data);
  };

  const onDelete = (uuid: string) => {
    axios.delete(`/api/flights/delete/${uuid}`).then(() => {
      toast.success("Berhasil Delete Flight");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div className="p-6">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Flights</h1>
          <button
            onClick={() => setIsAdd(true)}
            className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
          >
            Create
          </button>
        </div>
        <FlightTable
          initialValues={data}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />

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
        {selectedData && isEdit && (
          <EditFlight
            isOpen={isEdit}
            initialValues={selectedData}
            onClose={() => setIsEdit(false)}
            loading={loading}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
