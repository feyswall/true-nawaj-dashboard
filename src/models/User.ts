import { type UserType } from "@/types/modelTypes/UserType";
import Model from "./model";

class User extends Model {

  collectionName = "users";
  static collectionName: string = "users";

  orderByColumn = "created_at";

  public obj?: UserType;
  constructor(obj?: UserType) {
    super();
    this.obj = obj;
  }

}
export default User;
