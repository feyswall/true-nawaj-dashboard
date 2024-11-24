import { Timestamp } from "firebase/firestore";

export type PaymentType = {
  id: number;
  booking_id: number;
  amount: number;
  payment_date: string;
  payment_method: 'credit_card' | 'cash' | 'online';
  status: 'paid' | 'pending';
  created_at: Timestamp;
  updated_at: Timestamp|null;
};
