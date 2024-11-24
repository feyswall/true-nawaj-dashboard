import { type Timestamp } from "firebase/firestore";

export type PropertyType = {
  id?: string;
  owner_id: string|null;
  name: string;
  address: string;
  description: string|null;
  type: 'hotel' | 'apartment';
  status: 'Active' | 'Inactive';
  photos: Array<string>;
  showAsPopular: boolean;
  created_at: Timestamp;
  updated_at: Timestamp|null;
};

/**  Relations */
// rooms: Room[];
// bookings: Booking[];
// owner?: Owner;
// reviews?: Review[];
