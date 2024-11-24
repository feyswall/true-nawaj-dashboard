import type { OwnerType } from "@/types/modelTypes/OwnerType";
import Model from "./model";

class Owner extends Model {

  collectionName = "owners";
  static collectionName = "owners";
  orderByColumn = "created_at";

  public obj?: OwnerType;
  constructor(obj?: OwnerType) {
    super();
    this.obj = obj;
  }

}

export default Owner;
