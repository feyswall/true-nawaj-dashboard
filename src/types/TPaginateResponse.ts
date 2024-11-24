import { QuerySnapshot } from "firebase/firestore";

export type TPaginateResponse = {
    pageSize: number;
    currentPage: number;
    collection: any;
}