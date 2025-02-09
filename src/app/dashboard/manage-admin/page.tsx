"use client";
import { useCallback, useEffect, useState } from "react";
import UserTable from "@/components/table/UserTable";
import LayoutDashboard from "@/components/LayoutDashboard";
import { USER } from "@/types/user";
import axios from "axios";
import ErrorAxios from "@/lib/axios-error";
const Page: React.FC = () => {
  const [users, setUsers] = useState<USER[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialData = useCallback(async () => {
    setErrorMessage("");

    try {
      const response = await axios.get("/api/user/all/admin");
      if (response.status === 200 && response.data.data.length !== 0) {
        setUsers(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data user");
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    }
  }, []);

  useEffect(() => {
    initialData();
  }, [initialData]);

  return (
    <LayoutDashboard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
        <div className="mb-6"></div>

        <UserTable users={users} />
        {errorMessage && <p className="text-center p-4">{errorMessage}</p>}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
