import { type Timestamp } from "firebase/firestore";

export type featureType = {
  id: number;
  description: string;
  name: string;
  created_at: Timestamp;
  updated_at: Timestamp|null;
}

