import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Changed to bcryptjs to prevent package mismatch

const prisma = new PrismaClient();

async function main() {
  // Define the default admin password for the demo/portfolio environment
  const plainPassword = "adminpassword123";

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Create or Update the Admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Success! The admin account has been initialized.");
  console.log("Username:", admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
