import type { ReviewType } from "@/types/modelTypes/ReviewType";
import Model from "./model";

class Review extends Model {

  collectionName = "reviews";
  static collectionName = "reviews";
  orderByColumn = "created_at";

  public obj?: ReviewType;
  constructor(obj?: ReviewType) {
    super();
    this.obj = obj;
  }

}

export default Review;
