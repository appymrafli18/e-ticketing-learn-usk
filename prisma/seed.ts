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

  // generate maskapai
  for (let i = 1; i <= 5; i++) {
    const hashingPassword = await argon2.hash(`maskapai`);
    await prisma_connection.tbl_user.create({
      data: {
        name: `Maskapai ${i}`,
        username: `maskapai${i}`,
        email: `maskapai${i}@gmail.com`,
        password: hashingPassword,
        role: "MASKAPAI",
      },
    })
    console.log(`MASKAPAI ${i} CREATED!`);
  }

  // generate user
  for (let i = 1; i <= 5; i++) {
    const hashingPassword = await argon2.hash(`users`);
    await prisma_connection.tbl_user.create({
      data: {
        name: `User ${i}`,
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        password: hashingPassword,
        role: "USER",
      },
    })
    console.log(`USER ${i} CREATED!`);
  }
}


main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma_connection.$disconnect();
  });
