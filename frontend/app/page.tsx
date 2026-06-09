import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function HomePage() {
  return <HomeClient />;
}
