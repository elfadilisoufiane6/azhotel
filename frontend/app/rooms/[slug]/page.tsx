import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { rooms } from "@/lib/content/rooms";
import { RoomDetail } from "./RoomDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.shortDescription,
    openGraph: { title: room.name, description: room.shortDescription, images: room.images.map((i) => i.url) },
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();
  return <RoomDetail room={room} />;
}
