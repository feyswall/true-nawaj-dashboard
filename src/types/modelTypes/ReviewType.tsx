import { Timestamp } from "firebase/firestore";

export type ReviewType = {
  id: number;
  property_id: number;
  customer_id: number;
  rating: number;
  comment: string;
  created_at: Timestamp;
  updated_at: Timestamp|null;
};
