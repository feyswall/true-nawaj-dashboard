import Model from './model'
import type { PropertyType } from '@/types/modelTypes/PropertyType'
import Room from './Room'
import type { RoomType } from '@/types/modelTypes/RoomType'
import Booking from './Booking'
import type { BookingType } from '@/types/modelTypes/BookingType'
import Owner from './Owner'
import Review from './Review'
import { where } from 'firebase/firestore'

class Property extends Model {
  collectionName = 'properties';
  static collectionName: string = "properties";
  orderByColumn = 'name'

  public obj?: PropertyType
  constructor(obj?: PropertyType) {
    super()
    this.obj = obj
  }

  public manyRooms = async ()  => {
    const outcome = await Room.getConditioned(Room.collectionName, [where("property_id", "==", this.obj?.id ?? "")]);
    return outcome;
  }

  public manyBookings = async ()  => {
    const bookings: BookingType[] = await Booking.getWhereIn(Booking.collectionName, [this.obj?.id ?? ""]);
    return bookings;
  }

  public oneOwner = async ()  => {
    const owner = Owner.find(Owner.collectionName,this.obj?.owner_id ?? "");
    return owner;
  }


  public manyReviews = async ()  => {
    const reviews = await Review.getWhereIn(Review.collectionName, [this.obj?.id ?? ""]);
    return reviews;
  }
}

export default Property
