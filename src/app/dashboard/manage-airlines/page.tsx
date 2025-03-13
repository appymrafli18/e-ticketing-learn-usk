"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import AddAirlines from "@/components/modal/AddAirlines";
import EditAirlines from "@/components/modal/EditAirlines";

interface IAirlines {
  id: number;
  name: string;
  logo: string;
  user: {
    id: number;
    name: string;
  };
}

const Page: React.FC = () => {
  const [airlines, setAirlines] = useState<IAirlines[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedAirline, setSelectedAirline] = useState<IAirlines | null>(
    null
  );
  const { user } = useMe();

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("/api/airlines/all");
      if (response.status === 200 && response.data.data.length !== 0) {
        setAirlines(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data maskapai");
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onAdd = () => {
    setIsAdd(true);
  };

  const onEdit = (airline: IAirlines) => {
    setSelectedAirline(airline);
    setIsEdit(true);
  };

  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this airline?")) {
      try {
        await axios.delete(`/api/airlines/delete/${id}`);
        toast.success("Berhasil Menghapus Maskapai");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        const err = ErrorAxios(error);
        setErrorMessage(err);
      }
    }
  };

  const onSave = async (values: {
    name: string;
    logo: string;
    userId: number;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/airlines/create", values);
      if (response.status === 200) {
        toast.success("Berhasil Menambahkan Maskapai");
        setTimeout(() => {
          setIsAdd(false);
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  const onSaveEdit = async (values: {
    name: string;
    logo: string;
    userId: number;
  }) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/airlines/update/${selectedAirline?.id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Berhasil Mengubah Maskapai");
        setTimeout(() => {
          setIsEdit(false);
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold">Manage Airlines</h1>
          {user?.role === "ADMIN" ||
            (user?.role === "MASKAPAI" && (
              <button
                className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                onClick={onAdd}
              >
                Create
              </button>
            ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Logo</th>
                <th className="py-2 px-4 border-b">User</th>
                {user?.role === "ADMIN" ||
                  (user?.role === "MASKAPAI" && (
                    <th className="py-2 px-4 border-b">Actions</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {airlines?.map((airline) => (
                <tr key={airline.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{airline.name}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-20 h-20 object-contain"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{airline.user.name}</td>
                  {user?.role === "ADMIN" ||
                    (user?.role === "MASKAPAI" && (
                      <td className="py-2 px-4 border-b">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onEdit(airline)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(airline.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    ))}
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
        {isAdd && user && user.id && (
          <AddAirlines
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            onSave={onSave}
            loading={loading}
            userId={user.id}
          />
        )}
        {isEdit && selectedAirline && user && user.id && (
          <EditAirlines
            isOpen={isEdit}
            onClose={() => setIsEdit(false)}
            onSave={onSaveEdit}
            loading={loading}
            userId={user.id}
            initialValue={{
              name: selectedAirline.name,
              logo: selectedAirline.logo,
              userId: user.id,
            }}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
