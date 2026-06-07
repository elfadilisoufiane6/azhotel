"use client";

import useSWR from "swr";
import { apiClient } from "@/lib/api";

export type Availability = {
  roomId: string;
  available: boolean;
  pricePerNight: number;
  totalPrice: number;
};

export function useAvailability(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const q = new URLSearchParams({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: String(params.guests),
  }).toString();
  return useSWR(
    `/rooms/availability?${q}`,
    (url: string) => apiClient.get<Availability[]>(url),
    { revalidateOnFocus: false }
  );
}
