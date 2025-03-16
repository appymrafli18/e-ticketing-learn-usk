"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import AddAirlines from "@/components/modal/AddAirlines";
import EditAirlines from "@/components/modal/EditAirlines";
import Image from "next/image";
import AirlinesTable from "@/components/table/AirlinesTable";

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
        </div>
        <AirlinesTable />
      </div>
    </LayoutDashboard>
  );
};

export default Page;
