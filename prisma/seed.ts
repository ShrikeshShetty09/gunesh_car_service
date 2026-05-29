import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const existing = await prisma.adminUser.findFirst();
  if (!existing) {
    const hashed = await bcrypt.hash("gunesh@1975", 12);
    await prisma.adminUser.create({
      data: {
        email: "guneshcarservice@gmail.com",
        password: hashed,
        name: "Gunesh Raju Shetty",
      },
    });
    console.log("✅ Admin user created");
  }

  // Preload gallery images
  const existingGallery = await prisma.galleryImage.count();
  if (existingGallery === 0) {
    const images = [
      { url: "/images/car_photos/hero_bg1.jpg", order: 1 },
      { url: "/images/car_photos/hero_bg2.jpg", order: 2 },
      { url: "/images/car_photos/hero_bg3.jpg", order: 3 },
      { url: "/images/car_photos/hero_bg4.jpg", order: 4 },
      { url: "/images/gunesh_photo/driver_withcar.jpg", order: 5 },
      { url: "/images/gunesh_photo/ride_driver_photo.jpg", order: 6 },
    ];
    await prisma.galleryImage.createMany({ data: images });
    console.log("✅ Gallery images seeded");
  }

  console.log("🌱 Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
