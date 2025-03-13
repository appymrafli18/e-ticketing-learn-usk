"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "@/components/LayoutDashboard";
import { BOOKING } from "@/types/booking";
import { FLIGHT } from "@/types/flight";
import axios from "axios";
import { ErrorAxios } from "@/lib/axios-error";
import toast, { Toaster } from "react-hot-toast";
import useMe from "@/store/me";
import AddBooking from "@/components/modal/AddBooking";
import AddPayment from "@/components/modal/AddPayment";

const Page: React.FC = () => {
  const [bookings, setBookings] = useState<BOOKING[] | null>(null);
  const [flights, setFlights] = useState<FLIGHT[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isAddPayment, setIsAddPayment] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FLIGHT | null>(null);
  const { user } = useMe();

  const initialData = useCallback(async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const [bookingsResponse, flightsResponse] = await Promise.all([
        axios.get("/api/bookings/all"),
        axios.get("/api/flights/all")
      ]);

      if (bookingsResponse.status === 200 && bookingsResponse.data.data.length !== 0) {
        setBookings(bookingsResponse.data.data);
      } else {
        setErrorMessage("Tidak memiliki data booking");
      }

      if (flightsResponse.status === 200 && flightsResponse.data.data.length !== 0) {
        setFlights(flightsResponse.data.data);
      }
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onUpdateStatus = async (uuid: string, newStatus: string) => {
    try {
      await axios.put(`/api/bookings/update/${uuid}`, { status: newStatus });
      toast.success("Berhasil Mengubah Status Booking");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      const err = ErrorAxios(error);
      setErrorMessage(err);
    }
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onSave = async (values: BOOKING) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/bookings/create", values);
      if (response.status === 200) {
        toast.success("Berhasil Menambahkan Booking");
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

  const onSavePayment = async (values: { payment_method: string; bookingId: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/payments/create", values);
      if (response.status === 200) {
        toast.success("Berhasil Menambahkan Pembayaran");
        setTimeout(() => {
          setIsAddPayment(false);
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

  const onAddPayment = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsAddPayment(true);
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
          <h1 className="text-2xl font-bold">Manage Bookings</h1>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
            onClick={onAdd}
          >
            Add Booking
          </button>
        </div>

        {/* Flight Selection Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flights?.map((flight) => (
              <div
                key={flight.uuid}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedFlight?.uuid === flight.uuid
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedFlight(flight)}
              >
                <div className="font-semibold">{flight.no_penerbangan}</div>
                <div className="text-sm text-gray-600">
                  {flight.kota_keberangkatan} → {flight.kota_tujuan}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(flight.waktu_keberangkatan).toLocaleString()} →{" "}
                  {new Date(flight.waktu_kedatangan).toLocaleString()}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Price:</span> Rp {parseInt(flight.harga).toLocaleString()}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Available Seats:</span> {flight.kursi_tersedia}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID Booking</th>
                <th className="py-2 px-4 border-b">Jumlah Kursi</th>
                <th className="py-2 px-4 border-b">Total Harga</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Flight Details</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                {user?.role !== "USER" && (
                  <th className="py-2 px-4 border-b">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.uuid} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{booking.uuid.slice(0, 8)}...</td>
                  <td className="py-2 px-4 border-b">{booking.jumlah_kursi}</td>
                  <td className="py-2 px-4 border-b">
                    Rp {parseInt(booking.total_harga).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="text-sm">
                      <p>Flight: {booking.flight?.no_penerbangan}</p>
                      <p>{booking.flight?.kota_keberangkatan} → {booking.flight?.kota_tujuan}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.updatedAt).toLocaleString()}
                  </td>
                  {user?.role !== "USER" && (
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-col space-y-2">
                        {booking.status !== "Confirmed" && (
                          <button
                            onClick={() => onUpdateStatus(booking.uuid, "Confirmed")}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status !== "Cancelled" && (
                          <button
                            onClick={() => onUpdateStatus(booking.uuid, "Cancelled")}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                  {user?.role === "USER" && booking.status === "Pending" && (
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => onAddPayment(booking.uuid)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Pay
                      </button>
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
        {isAdd && selectedFlight && (
          <AddBooking
            isOpen={isAdd}
            onClose={() => {
              setIsAdd(false);
              setSelectedFlight(null);
            }}
            onSave={onSave}
            loading={loading}
            flight={selectedFlight}
          />
        )}
        {isAddPayment && selectedBookingId && (
          <AddPayment
            isOpen={isAddPayment}
            onClose={() => {
              setIsAddPayment(false);
              setSelectedBookingId(null);
            }}
            onSave={onSavePayment}
            loading={loading}
            bookingId={selectedBookingId}
          />
        )}
      </div>
    </LayoutDashboard>
  );
};

export default Page; 