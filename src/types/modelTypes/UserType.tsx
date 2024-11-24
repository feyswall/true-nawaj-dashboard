import { type Timestamp } from "firebase/firestore";

export type UserType = {
  id?: number;
  uid: string;
  role: string;
  name: string;
  created_at: Timestamp;
  updated_at: Timestamp | null;
}
