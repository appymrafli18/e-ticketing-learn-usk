/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_uuid_key` ON `tbl_user`(`uuid`);
