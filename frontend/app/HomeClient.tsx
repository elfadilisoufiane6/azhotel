"use client";

import { Hero } from "@/sections/Hero";
import { Marquee } from "@/sections/Marquee";
import { Showcase } from "@/sections/Showcase";
import { HomeBooking } from "@/sections/HomeBooking";
import { useT } from "@/lib/i18n";

export function HomeClient() {
  const { t } = useT();
  return (
    <>
      <Hero />
      <Marquee />

      <Showcase
        id="stay"
        desktop="/images/home/stay/main.jpg"
        mobile="/images/home/stay/mobile.jpg"
        eyebrow={t.rooms.eyebrow}
        title1={t.rooms.title1}
        title2={t.rooms.title2}
        body={t.rooms.lede}
        href="/rooms"
        cta={t.rooms.seeAll}
        align="left"
      />

      <Showcase
        id="dining"
        desktop="/images/home/dining/main.jpg"
        mobile="/images/home/dining/mobile.jpg"
        eyebrow={t.dining.eyebrow}
        title1={t.dining.title1}
        title2={t.dining.title2}
        body={t.dining.lede}
        href="/gallery"
        cta={t.dining.galleryEyebrow}
        align="right"
      />

      <Showcase
        id="address"
        desktop="/images/home/address/main.jpg"
        mobile="/images/home/address/mobile.jpg"
        eyebrow={t.address.eyebrow}
        title1={t.address.title1}
        title2={t.address.title2}
        body={t.address.body}
        href="/booking"
        cta={t.common.reserveNow}
        align="left"
      />

      <HomeBooking />
    </>
  );
}
