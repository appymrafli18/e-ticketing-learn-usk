/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `tbl_airlines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `tbl_flights` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `tbl_airlines` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `tbl_flights` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "tbl_airlines" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tbl_flights" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_airlines_uuid_key" ON "tbl_airlines"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_flights_uuid_key" ON "tbl_flights"("uuid");
