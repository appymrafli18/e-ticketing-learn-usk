"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { PAYMENT, IPayment } from "@/types/payment";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import AddPayment from "@/components/modal/AddPayment";

const Page: React.FC = () => {
  const [payments, setPayments] = useState<PAYMENT[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const { user } = useMe();

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("/api/payments/all");
      if (response.status === 200 && response.data.data.length !== 0) {
        setPayments(response.data.data);
      } else {
        setErrorMessage("Tidak memiliki data pembayaran");
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onUpdateStatus = async (uuid: string, newStatus?: string) => {
    try {
      if (newStatus) {
        await axios.put(`/api/payments/update/${uuid}`, { status: newStatus });
        toast.success("Berhasil Mengubah Status Pembayaran");
      } else {
        await axios.put(`/api/payments/update/${uuid}`);
        toast.success("Berhasil Mengkonfirmasi Pembayaran");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    }
  };

  const onAdd = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsAdd(true);
  };

  const onSave = async (values: IPayment) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/payments/create", values);
      if (response.status === 200) {
        toast.success("Berhasil Menambahkan Pembayaran");
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
          <h1 className="text-2xl font-bold">Manage Payments</h1>
          {user?.role !== "USER" && (
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              onClick={() => onAdd(selectedBookingId || "")}
            >
              Add Payment
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Payment Method</th>
                <th className="py-2 px-4 border-b">Jumlah Pembayaran</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Booking Details</th>
                <th className="py-2 px-4 border-b">Flight Details</th>
                <th className="py-2 px-4 border-b">Created At</th>
                {user?.role !== "USER" && (
                  <th className="py-2 px-4 border-b">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment.uuid} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {payment.payment_method}
                  </td>
                  <td className="py-2 px-4 border-b">
                    Rp {parseInt(payment.jumlah_pembayaran).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        payment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div>
                      <p>Jumlah Kursi: {payment.booking.jumlah_kursi}</p>
                      <p>
                        Total Harga: Rp{" "}
                        {parseInt(payment.booking.total_harga).toLocaleString()}
                      </p>
                      <p>Status: {payment.booking.status}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div>
                      <p>
                        No Penerbangan: {payment.booking.flight.no_penerbangan}
                      </p>
                      <p>
                        Rute: {payment.booking.flight.kota_keberangkatan} →{" "}
                        {payment.booking.flight.kota_tujuan}
                      </p>
                      <p>
                        Waktu:{" "}
                        {new Date(
                          payment.booking.flight.waktu_keberangkatan
                        ).toLocaleString()}{" "}
                        →{" "}
                        {new Date(
                          payment.booking.flight.waktu_kedatangan
                        ).toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                  {user?.role !== "USER" && (
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-col space-y-2">
                        {payment.status !== "Confirmed" && (
                          <button
                            onClick={() => onUpdateStatus(payment.uuid)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Confirm
                          </button>
                        )}
                        {payment.status !== "Rejected" && (
                          <button
                            onClick={() =>
                              onUpdateStatus(payment.uuid, "Rejected")
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  )}
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
        {isAdd && selectedBookingId && (
          <AddPayment
            isOpen={isAdd}
            onClose={() => setIsAdd(false)}
            onSave={onSave}
            loading={loading}
            bookingId={selectedBookingId}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page;
