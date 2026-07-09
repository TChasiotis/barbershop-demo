import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma"; // Σωστή διαδρομή αφού το lib είναι μέσα στο app
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Υπολογισμός κύκλου χρέωσης για το Remove.bg API (κάθε 19 του μήνα)
  const now = new Date();
  const resetDay = 19;
  let startOfBillingCycle;

  if (now.getDate() >= resetDay) {
    startOfBillingCycle = new Date(now.getFullYear(), now.getMonth(), resetDay);
  } else {
    startOfBillingCycle = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      resetDay,
    );
  }

  const monthlyUploadsCount = await prisma.apiLog.count({
    where: {
      createdAt: {
        gte: startOfBillingCycle,
      },
    },
  });

  // Άντληση δεδομένων από τη βάση
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const gallery = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminDashboard
      initialServices={services}
      initialProducts={products}
      initialGallery={gallery}
      monthlyUploadsCount={monthlyUploadsCount}
    />
  );
}
