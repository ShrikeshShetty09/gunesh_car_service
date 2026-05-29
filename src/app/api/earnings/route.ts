import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const [
    totalEarnings,
    monthEarnings,
    completedTrips,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    recentBookings,
    monthlyBreakdown,
  ] = await Promise.all([
    prisma.earning.aggregate({ _sum: { amount: true } }),
    prisma.earning.aggregate({
      where: { date: { gte: startOfMonth(now), lte: endOfMonth(now) } },
      _sum: { amount: true },
    }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "CANCELLED" } }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { price: true },
    }),
    // last 6 months
    Promise.all(
      Array.from({ length: 6 }, (_, i) => {
        const d = subMonths(now, i);
        return prisma.earning
          .aggregate({
            where: { date: { gte: startOfMonth(d), lte: endOfMonth(d) } },
            _sum: { amount: true },
          })
          .then((r) => ({
            month: d.toLocaleString("en-IN", { month: "short", year: "2-digit" }),
            total: r._sum.amount ?? 0,
          }));
      })
    ).then((arr) => arr.reverse()),
  ]);

  return NextResponse.json({
    totalEarnings: totalEarnings._sum.amount ?? 0,
    monthEarnings: monthEarnings._sum.amount ?? 0,
    completedTrips,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    recentBookings,
    monthlyBreakdown,
  });
}
