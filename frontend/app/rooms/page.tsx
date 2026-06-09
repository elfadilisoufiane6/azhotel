import type { Metadata } from "next";
import { RoomsClient } from "./RoomsClient";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RoomsPage() {
  return <RoomsClient />;
}
