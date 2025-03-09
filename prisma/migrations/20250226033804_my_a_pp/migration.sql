-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MASKAPAI');

-- CreateEnum
CREATE TYPE "StatusBooking" AS ENUM ('Booked', 'Pending', 'Expired');

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_airlines" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_flights" (
    "id" TEXT NOT NULL,
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
    "airlinesId" TEXT NOT NULL,

    CONSTRAINT "tbl_flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_bookings" (
    "id" TEXT NOT NULL,
    "jumlah_kursi" INTEGER NOT NULL,
    "total_harga" DECIMAL(10,2) NOT NULL,
    "status" "StatusBooking" NOT NULL DEFAULT 'Pending',
    "flightId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_airlines_userId_key" ON "tbl_airlines"("userId");

-- AddForeignKey
ALTER TABLE "tbl_airlines" ADD CONSTRAINT "tbl_airlines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_flights" ADD CONSTRAINT "tbl_flights_airlinesId_fkey" FOREIGN KEY ("airlinesId") REFERENCES "tbl_airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bookings" ADD CONSTRAINT "tbl_bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "tbl_flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bookings" ADD CONSTRAINT "tbl_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
