import { type AmenityType } from "@/types/modelTypes/AmenityType";
import Model from "./model";


class Amenity extends Model {
  collectionName = 'amenities';
  static collectionName: string = "amenities";
  orderByColumn = 'name'

  public obj?: AmenityType

  constructor(obj?: AmenityType) {
    super()
    this.obj = obj
  }

}

export default Amenity;
