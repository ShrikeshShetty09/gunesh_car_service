import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// ONE-TIME bootstrap route — DELETE AFTER USE
export async function GET() {
  const existing = await prisma.adminUser.findFirst();
  if (existing) {
    return NextResponse.json({ message: "Admin already exists", email: existing.email });
  }
  const hashed = await bcrypt.hash("gunesh@1975", 12);
  const admin = await prisma.adminUser.create({
    data: {
      email: "guneshcarservice@gmail.com",
      password: hashed,
      name: "Gunesh Raju Shetty",
    },
  });
  return NextResponse.json({ message: "Admin created!", email: admin.email });
}
