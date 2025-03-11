-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'MASKAPAI');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Confirmed', 'Canceled');

-- CreateEnum
CREATE TYPE "TypeReport" AS ENUM ('Transaksi', 'Penerbangan', 'Keuangan', 'Lainnya');

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_airlines" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_flights" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "tbl_bookings" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "jumlah_kursi" INTEGER NOT NULL,
    "total_harga" DECIMAL(10,2) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "flightId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tbl_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_payments" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "jumlah_pembayaran" DECIMAL(10,2) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "tbl_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_reports" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "TypeReport" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookingId" INTEGER,
    "paymentId" INTEGER,

    CONSTRAINT "tbl_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_uuid_key" ON "tbl_user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_username_key" ON "tbl_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_airlines_uuid_key" ON "tbl_airlines"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_airlines_userId_key" ON "tbl_airlines"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_flights_uuid_key" ON "tbl_flights"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_bookings_uuid_key" ON "tbl_bookings"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_payments_uuid_key" ON "tbl_payments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_payments_bookingId_key" ON "tbl_payments"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_reports_uuid_key" ON "tbl_reports"("uuid");

-- AddForeignKey
ALTER TABLE "tbl_airlines" ADD CONSTRAINT "tbl_airlines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_flights" ADD CONSTRAINT "tbl_flights_airlinesId_fkey" FOREIGN KEY ("airlinesId") REFERENCES "tbl_airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bookings" ADD CONSTRAINT "tbl_bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "tbl_flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_bookings" ADD CONSTRAINT "tbl_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_payments" ADD CONSTRAINT "tbl_payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "tbl_bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_reports" ADD CONSTRAINT "tbl_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_reports" ADD CONSTRAINT "tbl_reports_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "tbl_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_reports" ADD CONSTRAINT "tbl_reports_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "tbl_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
