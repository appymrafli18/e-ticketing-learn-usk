"use client";
import { useCallback, useEffect, useState } from "react";
import UserTable from "@/components/table/UserTable";
import LayoutDashboard from "@/components/LayoutDashboard";
import { USER } from "@/types/user";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import EditUser from "@/components/modal/EditUser";
import toast, { Toaster } from "react-hot-toast";
import AddUser from "@/components/modal/AddUser";
const Page: React.FC = () => {
  const [users, setUsers] = useState<USER[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<USER | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("/api/user/all/user");
      if (response.status === 200 && response.data.data.length !== 0) {
        setUsers(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data user");
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
  };

  const onSave = async (values: USER) => {
    setLoading(true);
    try {
      let response;

      if (values.uuid) {
        response = await axios.put(`/api/user/update/${values.uuid}`, values);
        toast.success("Berhasil Mengubah Data User");
      } else {
        console.log(values);
        response = await axios.post(`/api/user/create`, values);
        toast.success("Berhasil Menambahkan Data User");
      }

      if (response.status) {
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

  const onDelete = (uuid: string) => {
    axios
      .delete(`/api/user/delete/${uuid}`)
      .then(() => {
        toast.success("Berhasil Delete User");
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
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <button
            className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
            onClick={() => onAdd()}
          >
            Create
          </button>
        </div>
        <UserTable
          users={users}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
        {isOpen && (
          <EditUser
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={onSave}
            loading={loading}
            title="Users"
            initialValue={selectedUser}
          />
        )}
        {isAdd && (
          <AddUser
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            onSave={onSave}
            loading={loading}
            title="Users"
          />
        )}
        {errorMessage && <p className="text-center p-4">{errorMessage}</p>}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
