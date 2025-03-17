export interface FLIGHT {
  id?: number;
  uuid?: string;
  no_penerbangan: string;
  kota_keberangkatan: string;
  kota_tujuan: string;
  waktu_keberangkatan: string;
  waktu_kedatangan: string;
  harga: number;
  kapasitas_kursi: number;
  kursi_tersedia: number;
  createdAt?: string;
  updatedAt?: string;
}
