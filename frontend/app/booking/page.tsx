import type { Metadata } from "next";
import { BookingClient } from "./BookingClient";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function BookingPage() {
  return <BookingClient />;
}
