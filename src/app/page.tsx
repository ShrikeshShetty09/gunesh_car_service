import { Hero } from "@/components/home/Hero";
import { AboutDriver } from "@/components/home/AboutDriver";
import { Services } from "@/components/home/Services";
import { RideOptions } from "@/components/home/RideOptions";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BookingCTA } from "@/components/home/BookingCTA";


export default function Home() {
  return (
    <>
      <Hero />
      <AboutDriver />
      <Services />
      <RideOptions />
      <GalleryPreview />
      <BookingCTA />

    </>
  );
}
