import Model from "@/models/model";
import type { ReviewType } from "../types/modelTypes/ReviewType";

class Review extends Model {

  collectionName = "reviews";
  orderByColumn = "created_at";

  public obj?: ReviewType;
  constructor(obj?: ReviewType) {
    super();
    this.obj = obj;
  }

}

export default Review;
