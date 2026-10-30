export type BookingStatus = "upcoming" | "past" | "cancelled";

export interface Booking {
  id: string;
  masterId: string;
  serviceId: string;
  slot: string;
  clientName: string;
  status: BookingStatus;
}
