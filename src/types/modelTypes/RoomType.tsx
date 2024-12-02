import { type Timestamp } from "firebase/firestore";

export type RoomType = {
  id?: string;
  photos: [],
  property_id: string;
  room_number: string;
  type: 'single' | 'double' | 'suite' | string;
  basePrice: number;
  hightPrice: number;
  lowPrice: number;
  occupancy: number;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp|null;
};

/** Relation required */
// features: RoomFeature[];
// bookings: Booking[];
