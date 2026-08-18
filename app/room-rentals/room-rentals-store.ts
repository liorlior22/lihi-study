"use client";

import { useEffect, useState } from "react";

export type RentalPaymentStatus = "שולם" | "טרם שולם";

export type RoomRental = {
  id: string;
  date: string;
  time: string;
  therapistName: string;
  priceBeforeVat: number;
  paymentStatus: RentalPaymentStatus;
};

const STORAGE_KEY = "lihi-clinic-room-rentals-v1";
const UPDATE_EVENT = "lihi-room-rentals-updated";

export function readRoomRentals(): RoomRental[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RoomRental[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRoomRentals(rentals: RoomRental[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rentals));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

export function useRoomRentals() {
  const [rentals, setRentals] = useState<RoomRental[]>([]);

  useEffect(() => {
    const refresh = () => setRentals(readRoomRentals());
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(UPDATE_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(UPDATE_EVENT, refresh);
    };
  }, []);

  function saveRentals(next: RoomRental[] | ((current: RoomRental[]) => RoomRental[])) {
    setRentals((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      writeRoomRentals(resolved);
      return resolved;
    });
  }

  return [rentals, saveRentals] as const;
}
