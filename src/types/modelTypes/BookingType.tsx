import { Timestamp } from "firebase/firestore";

export type BookingType = {
  id?: number;
  property_id: number;
  room_id: number;
  customer_id: number;
  check_in_date: string;
  check_out_date: string;
  status: 'confirmed' | 'cancelled';
  created_at: Timestamp;
  updated_at: Timestamp|null;
  payment?: Payment;
};
