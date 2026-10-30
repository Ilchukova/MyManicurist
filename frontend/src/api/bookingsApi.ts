import type { Booking } from "../types";
import { mockBookings } from "../data/mock";

export async function getBookings(): Promise<Booking[]> {
  return Promise.resolve(mockBookings);
}