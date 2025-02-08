import { prisma_connection } from "@/lib/prisma-orm";
import argon2 from "argon2";

async function main() {
  const admin = await prisma_connection.tbl_user.findUnique({
    where: {
      username: "admin",
    },
  });

  const hashingPassword = await argon2.hash(process.env.ADMIN_PASS!);

  if (!admin) {
    await prisma_connection.tbl_user.create({
      data: {
        name: "admin",
        username: "admin",
        email: "admin@gmail.com",
        password: hashingPassword,
        role: "ADMIN",
      },
    });
    console.log("ADMIN CREATED!");
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma_connection.$disconnect();
  });
