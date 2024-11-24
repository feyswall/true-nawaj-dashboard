import { Timestamp } from "firebase/firestore";

export type CustomerType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: Timestamp;
  updated_at: Timestamp|null;
  bookings: Booking[];
  reviews?: Review[];
};
