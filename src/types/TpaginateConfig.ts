import { DocumentData, Query, QueryConstraint, QueryFieldFilterConstraint } from "firebase/firestore";

interface paginateQueryConf {
    pageSize: number;
    orderByColumn: string;
    currentPage: number;
    defaultQuery?: QueryFieldFilterConstraint[]|QueryConstraint[]|null
  }

  export default paginateQueryConf;
