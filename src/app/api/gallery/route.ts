import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    where: { isHidden: false },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { url, publicId } = body;
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({
    data: { url, publicId: publicId || null, order: count + 1 },
  });
  return NextResponse.json(image, { status: 201 });
}
