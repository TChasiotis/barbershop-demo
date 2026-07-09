import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// --- ADD NEW SERVICE ---
export async function POST(req: Request) {
  // Security: Check if the user is a logged-in Admin
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized access", { status: 401 });

  try {
    const body = await req.json();
    const { name, duration, price, nameEn } = body;

    // Save to database
    const newService = await prisma.service.create({
      data: {
        name,
        duration,
        price,
        nameEn: nameEn || "", // Προαιρετικό πεδίο για την αγγλική έκδοση
      },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("POST Error:", error);
    return new NextResponse("Error creating service", { status: 500 });
  }
}

// --- DELETE SERVICE ---
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized access", { status: 401 });

  try {
    // Get ID from URL (e.g. /api/services?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new NextResponse("Service ID is missing", { status: 400 });

    // Delete from database
    await prisma.service.delete({
      where: { id },
    });

    return new NextResponse("Service deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new NextResponse("Error deleting service", { status: 500 });
  }
}
