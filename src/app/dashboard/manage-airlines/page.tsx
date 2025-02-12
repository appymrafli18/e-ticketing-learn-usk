"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import EditFlights from "@/components/modal/EditAirlines";
import AirlinesTable from "@/components/table/AirlinesTable";
import { ErrorAxios } from "@/lib/axios-error";
import { IAirlines, IAirlinesAPI } from "@/types/airlines";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState<IAirlines[] | null>(null);
  const [selectedAirlines, setSelectedAirlines] = useState<IAirlines | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onEdit = (selectUser: IAirlines) => {
    setIsOpen(true);
    setSelectedAirlines(selectUser);
  };

  const onSave = async (values: IAirlines) => {
    setLoading(true);
    try {
      console.log(values.logo);

      const response = await axios.put(
        `/api/airlines/update/${values.id}`,
        {
          name: values.name,
          logo: values.logo,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Berhasil Mengubah Data User");
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
    setLoading(true);
    axios
      .get("/api/airlines/all")
      .then((res) => {
        const { data } = res.data;
        const payload: IAirlines[] = data.map((item: IAirlinesAPI) => ({
          id: item.id,
          name: item.name,
          logo: item.logo,
          user: {
            id: item.user.id,
            name: item.user.name,
          },
        }));
        setInitialValue(payload);
        setLoading(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <LayoutDashboard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Flights</h1>
        <div className="mb-6"></div>

        <AirlinesTable
          airlines={initialValue}
          loading={loading}
          onEdit={onEdit}
        />
        <div>{/* <Toaster position="top-right" reverseOrder={false} /> */}</div>
        {isOpen && (
          <EditFlights
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSave={onSave}
            loading={loading}
            title="Users"
            initialValue={selectedAirlines}
          />
        )}
        {errorMessage && <p className="text-center p-4">{errorMessage}</p>}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
