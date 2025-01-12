"use client";

import Contact from "@/components/Contact";
import IntroPage from "@/components/Intro";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import AQI from "@/components/AQI";

export default function Home() {
  return (
    <main className="flex flex-col gap-[20px]">
      <IntroPage />
      <AQI />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
