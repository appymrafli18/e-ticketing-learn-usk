"use client";

import { FLIGHT } from "@/types/flight";
import { ChangeEvent, useState } from "react";

interface IAddFlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: FLIGHT) => void;
  loading: boolean;
}

export default function AddFlight({
  isOpen,
  onClose,
  onSave,
  loading,
}: IAddFlightProps) {
  const [value, setValue] = useState<FLIGHT>({
    no_penerbangan: "",
    kota_keberangkatan: "",
    kota_tujuan: "",
    waktu_keberangkatan: "",
    waktu_kedatangan: "",
    harga: "",
    kapasitas_kursi: 0,
    kursi_tersedia: 0,
  } as FLIGHT);

  if (!isOpen) return null;

  const onChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: name === "kapasitas_kursi" || name === "kursi_tersedia" ? 
        parseInt(inputValue) : 
        name === "harga" ? 
        inputValue.replace(/\D/g, "") : 
        inputValue,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Add Flight
        </h2>
        <div>
          <label className="text-sm font-medium">No Penerbangan</label>
          <input
            type="text"
            onChange={onChangeValues}
            name="no_penerbangan"
            value={value.no_penerbangan}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Flight Number..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Kota Keberangkatan</label>
          <input
            type="text"
            onChange={onChangeValues}
            name="kota_keberangkatan"
            value={value.kota_keberangkatan}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Departure City..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Kota Tujuan</label>
          <input
            type="text"
            onChange={onChangeValues}
            name="kota_tujuan"
            value={value.kota_tujuan}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Destination City..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Waktu Keberangkatan</label>
          <input
            type="datetime-local"
            onChange={onChangeValues}
            name="waktu_keberangkatan"
            value={value.waktu_keberangkatan}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Waktu Kedatangan</label>
          <input
            type="datetime-local"
            onChange={onChangeValues}
            name="waktu_kedatangan"
            value={value.waktu_kedatangan}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Harga</label>
          <input
            type="text"
            onChange={onChangeValues}
            name="harga"
            value={value.harga}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Price..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Kapasitas Kursi</label>
          <input
            type="number"
            onChange={onChangeValues}
            name="kapasitas_kursi"
            value={value.kapasitas_kursi}
            min={0}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Seat Capacity..."
          />
        </div>
        <div>
          <label className="text-sm font-medium">Kursi Tersedia</label>
          <input
            type="number"
            onChange={onChangeValues}
            name="kursi_tersedia"
            value={value.kursi_tersedia}
            min={0}
            max={value.kapasitas_kursi}
            className="w-full p-2 border-2 rounded-md mb-2 focus:outline-none text-black text-opacity-70 focus:ring-2 focus:ring-blue-500"
            placeholder="Available Seats..."
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={loading || !value.no_penerbangan || !value.kota_keberangkatan || !value.kota_tujuan || !value.waktu_keberangkatan || !value.waktu_kedatangan || !value.harga || !value.kapasitas_kursi}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              (loading || !value.no_penerbangan || !value.kota_keberangkatan || !value.kota_tujuan || !value.waktu_keberangkatan || !value.waktu_kedatangan || !value.harga || !value.kapasitas_kursi) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onSave(value)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 