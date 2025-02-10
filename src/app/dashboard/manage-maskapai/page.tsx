"use client";
import { useCallback, useEffect, useState } from "react";
import UserTable from "@/components/table/UserTable";
import LayoutDashboard from "@/components/LayoutDashboard";
import { USER } from "@/types/user";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import EditUser from "@/components/modal/EditUser";
import toast, { Toaster } from "react-hot-toast";
const Page: React.FC = () => {
  const [users, setUsers] = useState<USER[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<USER | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("/api/user/all/maskapai");
      if (response.status === 200 && response.data.data.length !== 0) {
        setUsers(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data Maskapai");
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onEdit = (selectUser: USER) => {
    setIsOpen(true);
    setSelectedUser(selectUser);
    console.log({ selectUser });
  };

  const onSave = async (values: USER) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/user/update/${values.uuid}`,
        values
      );

      if (response.status === 200) {
        toast.success("Berhasil Mengubah Data Maskapai");
        setTimeout(() => {
          setIsOpen(false);
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

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Maskapai</h1>
        <div className="mb-6"></div>

        <UserTable users={users} loading={loading} onEdit={onEdit} />
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        {isOpen && (
          <EditUser
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={onSave}
            loading={loading}
            title="Maskapai"
            initialValue={selectedUser}
          />
        )}
        {errorMessage && <p className="text-center p-4">{errorMessage}</p>}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
