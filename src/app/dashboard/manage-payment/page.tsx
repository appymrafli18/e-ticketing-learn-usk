"use client";
import LayoutDashboard from "@/components/LayoutDashboard";
import PaymentsTable from "@/components/table/PaymentsTable";
import toast, { Toaster } from "react-hot-toast";
// import useMe from "@/store/me";
import { useCallback, useEffect, useState } from "react";
import { PAYMENT } from "@/types/payment";
import { ErrorAxios } from "@/lib/axios-error";
import axios from "axios";

const Page: React.FC = () => {
  // const { user } = useMe();
  const [data, setData] = useState<PAYMENT[]>();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = useCallback(async () => {
    setLoading(true);
    setErrorMessage({});
    try {
      const response = await axios.get("/api/payments/all");

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

  const onConfirm = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Confirmed",
      });

      if (response.status === 200) {
        toast.success("Berhasil Konfirmasi Pembayaran");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = async (uuid: string) => {
    try {
      const response = await axios.put(`/api/payments/update/${uuid}`, {
        status: "Canceled",
      });

      if (response.status === 200) {
        toast.success("Berhasil Batalkan Pembayaran");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initialValues();
  }, [initialValues]);

  return (
    <LayoutDashboard>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Payments</h1>
        </div>
        {data && (
          <PaymentsTable
            initialValues={data}
            errorMessage={errorMessage}
            loading={loading}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
