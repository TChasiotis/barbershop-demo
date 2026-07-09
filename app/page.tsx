import ClientHome from "./ClientHome";
import prisma from "./lib/prisma"; // Αλλάξαμε τη διαδρομή για να βγει έναν φάκελο έξω

// Κάνουμε τη σελίδα να ανανεώνεται δυναμικά
export const revalidate = 0;

export default async function Home() {
  // Τραβάμε τις υπηρεσίες ΤΑΞΙΝΟΜΗΜΕΝΕΣ βάσει του sortOrder
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  // Τραβάμε τα προϊόντα ΤΑΞΙΝΟΜΗΜΕΝΑ βάσει του sortOrder
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  // Τραβάμε τις φωτογραφίες της Γκαλερί ΤΑΞΙΝΟΜΗΜΕΝΕΣ
  const gallery = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <ClientHome services={services} products={products} gallery={gallery} />
  );
}
