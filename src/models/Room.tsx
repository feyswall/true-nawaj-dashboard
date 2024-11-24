import type { RoomType } from "@/types/modelTypes/RoomType";
import Model from "./model";
import Property from "./Property";
import type { PropertyType } from "@/types/modelTypes/PropertyType";

class Room extends Model {

  collectionName = "rooms";
  static collectionName = "rooms";
  orderByColumn = "created_at";

  public obj?: RoomType;
  constructor(obj?: RoomType) {
    super();
    this.obj = obj;
  }

  /**
   * TYPE Reverse relation to property
   */
  public oneProperty = async ()  => {
    const propertyObject = new Property();

    // const ans = !this.obj ? null : (
    //   this.obj.property_id ? propertyObject.find(this.obj.property_id) : null
    // );
    // return ans;
    const owner = propertyObject.find<PropertyType>(this.obj?.property_id ?? "");

    return owner;
  }

}

export default Room;
