import { type Timestamp } from "firebase/firestore";

export type OwnerType = {
  id?: number;
  name: string;
  about_me: string,
  contact_info: string;
  created_at: Timestamp;
  updated_at: Timestamp|null;
};
