import { FLIGHT } from "@/types/flight";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: FLIGHT) => void;
  loading: boolean;
  initialValue: FLIGHT | null;
}

const EditFlight: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  loading,
  initialValue,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      ...initialValue,
      no_penerbangan: formData.get("no_penerbangan") as string,
      kota_keberangkatan: formData.get("kota_keberangkatan") as string,
      kota_tujuan: formData.get("kota_tujuan") as string,
      waktu_keberangkatan: formData.get("waktu_keberangkatan") as string,
      waktu_kedatangan: formData.get("waktu_kedatangan") as string,
      harga: formData.get("harga") as string,
      kapasitas_kursi: parseInt(formData.get("kapasitas_kursi") as string),
      kursi_tersedia: parseInt(formData.get("kursi_tersedia") as string),
    };
    onSave(values as FLIGHT);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Edit Flight</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No Penerbangan
                </label>
                <input
                  type="text"
                  name="no_penerbangan"
                  defaultValue={initialValue?.no_penerbangan}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kota Keberangkatan
                </label>
                <input
                  type="text"
                  name="kota_keberangkatan"
                  defaultValue={initialValue?.kota_keberangkatan}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kota Tujuan
                </label>
                <input
                  type="text"
                  name="kota_tujuan"
                  defaultValue={initialValue?.kota_tujuan}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Waktu Keberangkatan
                </label>
                <input
                  type="datetime-local"
                  name="waktu_keberangkatan"
                  defaultValue={initialValue?.waktu_keberangkatan.split(".")[0]}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Waktu Kedatangan
                </label>
                <input
                  type="datetime-local"
                  name="waktu_kedatangan"
                  defaultValue={initialValue?.waktu_kedatangan.split(".")[0]}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Harga
                </label>
                <input
                  type="number"
                  name="harga"
                  defaultValue={initialValue?.harga}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kapasitas Kursi
                </label>
                <input
                  type="number"
                  name="kapasitas_kursi"
                  defaultValue={initialValue?.kapasitas_kursi}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kursi Tersedia
                </label>
                <input
                  type="number"
                  name="kursi_tersedia"
                  defaultValue={initialValue?.kursi_tersedia}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFlight; 