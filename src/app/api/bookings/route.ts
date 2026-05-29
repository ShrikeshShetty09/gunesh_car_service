import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";
import {
  sendEmail,
  adminBookingNotificationHtml,
  customerConfirmationHtml,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const booking = await prisma.booking.create({
      data: {
        pickupLocation: data.pickupLocation,
        dropLocation: data.dropLocation,
        dateTime: new Date(data.dateTime),
        passengers: data.passengers,
        tripType: data.tripType,
        phoneNumber: data.phoneNumber,
        email: data.email || null,
        specialInstructions: data.specialInstructions || null,
      },
    });

    // Send emails (non-blocking)
    const adminEmail = process.env.ADMIN_EMAIL!;
    sendEmail({
      to: adminEmail,
      subject: `New Booking: ${booking.pickupLocation} → ${booking.dropLocation}`,
      html: adminBookingNotificationHtml(booking),
    }).catch(console.error);

    if (booking.email) {
      sendEmail({
        to: booking.email,
        subject: "Booking Received – Sri Durgaparameshwari Tourist",
        html: customerConfirmationHtml(booking),
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const bookings = await prisma.booking.findMany({
      where: {
        ...(status && status !== "ALL" ? { status: status as any } : {}),
        ...(search
          ? {
              OR: [
                { phoneNumber: { contains: search, mode: "insensitive" } },
                { pickupLocation: { contains: search, mode: "insensitive" } },
                { dropLocation: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { price: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
