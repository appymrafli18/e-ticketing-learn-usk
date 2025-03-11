/*
  Warnings:

  - You are about to drop the `tbl_notifications` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `tbl_bookings` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `tbl_bookings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "tbl_notifications" DROP CONSTRAINT "tbl_notifications_userId_fkey";

-- AlterTable
ALTER TABLE "tbl_bookings" ADD COLUMN     "uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "tbl_notifications";

-- CreateIndex
CREATE UNIQUE INDEX "tbl_bookings_uuid_key" ON "tbl_bookings"("uuid");
