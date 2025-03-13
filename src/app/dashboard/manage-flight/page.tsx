"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { FLIGHT } from "@/types/flight";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import EditFlight from "@/components/modal/EditFlight";
import AddFlight from "@/components/modal/AddFlight";

const Page: React.FC = () => {
  const [flights, setFlights] = useState<FLIGHT[] | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FLIGHT | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("/api/flights/all");
      if (response.status === 200 && response.data.data.length !== 0) {
        setFlights(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data penerbangan");
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onEdit = (selectFlight: FLIGHT) => {
    setIsOpen(true);
    setSelectedFlight(selectFlight);
  };

  const onSave = async (values: FLIGHT) => {
    setLoading(true);
    try {
      let response;

      if (values.uuid) {
        response = await axios.put(
          `/api/flights/update/${values.uuid}`,
          values
        );
        toast.success("Berhasil Mengubah Data Penerbangan");
      } else {
        response = await axios.post(`/api/flights/create`, values);
        toast.success("Berhasil Menambahkan Data Penerbangan");
      }

      if (response.status) {
        setTimeout(() => {
          setIsOpen(false);
          setIsAdd(false);
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const onDelete = (uuid: string) => {
    axios
      .delete(`/api/flights/delete/${uuid}`)
      .then(() => {
        toast.success("Berhasil Delete Penerbangan");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => console.log(error));
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Flights</h1>
          <button
            className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
            onClick={() => onAdd()}
          >
            Create
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">No Penerbangan</th>
                <th className="py-2 px-4 border-b">Kota Keberangkatan</th>
                <th className="py-2 px-4 border-b">Kota Tujuan</th>
                <th className="py-2 px-4 border-b">Waktu Keberangkatan</th>
                <th className="py-2 px-4 border-b">Waktu Kedatangan</th>
                <th className="py-2 px-4 border-b">Harga</th>
                <th className="py-2 px-4 border-b">Kapasitas Kursi</th>
                <th className="py-2 px-4 border-b">Kursi Tersedia</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights?.map((flight) => (
                <tr key={flight.uuid} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {flight.no_penerbangan}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {flight.kota_keberangkatan}
                  </td>
                  <td className="py-2 px-4 border-b">{flight.kota_tujuan}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(flight.waktu_keberangkatan).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(flight.waktu_kedatangan).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    Rp {parseInt(flight.harga).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {flight.kapasitas_kursi}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {flight.kursi_tersedia}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => onEdit(flight)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(flight.uuid)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="text-center p-4">
            <p>Loading...</p>
          </div>
        )}
        {errorMessage && (
          <p className="text-center p-4 text-red-500">{errorMessage}</p>
        )}
        {isOpen && (
          <EditFlight
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={onSave}
            loading={loading}
            initialValue={selectedFlight}
          />
        )}
        {isAdd && (
          <AddFlight
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            onSave={onSave}
            loading={loading}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
