import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { priceSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const { status, price } = body;

    const updateData: any = {};
    if (status) updateData.status = status;

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    // If price is provided, upsert it
    if (price !== undefined) {
      const parsed = priceSchema.safeParse({ bookingId: id, amount: price });
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      }
      await prisma.bookingPrice.upsert({
        where: { bookingId: id },
        update: { amount: parsed.data.amount },
        create: { bookingId: id, amount: parsed.data.amount },
      });

      // If marking as completed and price exists, record as earning
      if (status === "COMPLETED") {
        await prisma.earning.create({
          data: { amount: parsed.data.amount, reference: id },
        });
      }
    }

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.booking.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
