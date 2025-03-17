  import React from "react";
  import TempLoader from "../TempLoader";
  import { PAYMENT } from "@/types/payment";

  interface PaymentsTableProps {
    initialValues: PAYMENT[];
    loading: boolean;
    errorMessage: Record<string, string>;
    onConfirm: (uuid: string) => void;
    onCancel: (uuid: string) => void;
  }

  const PaymentsTable = ({
    initialValues,
    loading,
    errorMessage,
    onConfirm,
    onCancel,
  }: PaymentsTableProps) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200 text-sm leading-normal text-gray-600 uppercase">
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Nama Booking</th>
              <th className="px-6 py-3 text-left">Metode Pembayaran</th>
              <th className="px-6 py-3 text-left">Jumlah Pembayaran</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {initialValues.map((item, index) => {
              // if (item.status === "Confirmed") return null;
              return (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-left">
                    {item.booking.user.name}
                  </td>
                  <td className="px-6 py-3 text-left">{item.payment_method}</td>
                  <td className="px-6 py-3 text-left">
                    {item.jumlah_pembayaran}
                  </td>
                  <td className="px-6 py-3 text-left">
                    <p className={`status status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </p>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="rounded bg-green-500 px-4 mx-1 py-1 text-white"
                      onClick={() => onConfirm(item.uuid)}
                    >
                      Confirm
                    </button>
                    <button
                      className="rounded bg-red-500 px-4 mx-1 py-1 text-white"
                      onClick={() => onCancel(item.uuid)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {errorMessage.error && <p>{errorMessage.error}</p>}
        {loading && <TempLoader />}
      </div>
    );
  };

  export default PaymentsTable;
