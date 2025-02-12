-- CreateTable
CREATE TABLE "tbl_flights" (
    "id" SERIAL NOT NULL,
    "no_penerbangan" TEXT NOT NULL,
    "kota_keberangkatan" TEXT NOT NULL,
    "kota_tujuan" TEXT NOT NULL,
    "waktu_keberangkatan" TIMESTAMP(3) NOT NULL,
    "waktu_kedatangan" TIMESTAMP(3) NOT NULL,
    "harga" DECIMAL(10,2) NOT NULL,
    "kapasitas_kursi" INTEGER NOT NULL,
    "kursi_tersedia" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "airlinesId" INTEGER NOT NULL,

    CONSTRAINT "tbl_flights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_flights" ADD CONSTRAINT "tbl_flights_airlinesId_fkey" FOREIGN KEY ("airlinesId") REFERENCES "tbl_airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
