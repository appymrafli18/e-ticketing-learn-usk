-- CreateEnum
CREATE TYPE "TypeReport" AS ENUM ('Transaksi', 'Penerbangan');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "TypeReport" NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_uuid_key" ON "Report"("uuid");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
