"use client";

import { FLIGHT } from "@/types/flight";
import FormComponent from "../form/FormComponent";
import InputField from "../input/InputField";

interface IAddFlightProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export default function AddFlight({
  isOpen,
  onClose,
  loading,
}: IAddFlightProps) {
  if (!isOpen) return null;

  const initialValues: FLIGHT = {
    no_penerbangan: "",
    kota_keberangkatan: "",
    kota_tujuan: "",
    waktu_keberangkatan: "",
    waktu_kedatangan: "",
    harga: 0,
    kapasitas_kursi: 0,
    kursi_tersedia: 0,
  };

  const handleSubmit = async (data: FLIGHT) => {
    console.log("submitted:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Tambah Flight</h2>

        <FormComponent<FLIGHT>
          initialValues={initialValues}
          buttonLoading={loading}
          onClose={onClose}
          onSubmit={handleSubmit}
          isCancel={true}
          submitLabel="Simpan"
        >
          {({ formData, handleChange }) => (
            <>
              <InputField
                label="No Penerbangan"
                name="no_penerbangan"
                value={formData.no_penerbangan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Nomor Penerbangan"
              />
              <InputField
                label="Kota Keberangkatan"
                name="kota_keberangkatan"
                value={formData.kota_keberangkatan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kota Keberangkatan"
              />
              <InputField
                label="Kota Tujuan"
                name="kota_tujuan"
                value={formData.kota_tujuan}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kota Tujuan"
              />
              <InputField
                label="Waktu Keberangkatan"
                name="waktu_keberangkatan"
                value={formData.waktu_keberangkatan}
                onChange={handleChange}
                required
                type="date"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Keberangkatan"
              />
              <InputField
                label="Waktu Kedatangan"
                name="waktu_kedatangan"
                value={formData.waktu_kedatangan}
                onChange={handleChange}
                required
                type="date"
                inputStyle="w-full"
                placeholder="Masukkan Waktu Kedatangan"
              />
              <InputField
                label="Harga"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Harga"
              />
              <InputField
                label="Kapasitas Kursi"
                name="kapasitas_kursi"
                value={formData.kapasitas_kursi}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kapasitas Kursi"
              />
              <InputField
                label="Kursi Tersedia"
                name="kursi_tersedia"
                value={formData.kursi_tersedia}
                onChange={handleChange}
                required
                inputStyle="w-full"
                placeholder="Masukkan Kursi Tersedia"
              />
            </>
          )}
        </FormComponent>
      </div>
    </div>
  );
}
