import type { BookingType } from "@/types/modelTypes/BookingType";
import Model from "./model";

class Booking extends Model {

  collectionName = "bookings";
  static collectionName = "bookings";
  orderByColumn = "created_at";

  public obj?: BookingType;
  constructor(obj?: BookingType) {
    super();
    this.obj = obj;
  }

}

export default Booking;
