import { getDoc } from 'firebase/firestore'
import type {QueryConstraint, QueryFieldFilterConstraint} from "firebase/firestore";
import QueryBuilder from '@/queries/QueryBuilder'

class Model implements ModelInterface {
  collectionName?: string;
  orderByColumn?: string;

  getCollectionName(): string {
    if (!this.collectionName) {
      return this.constructor.name
    }

    return this.collectionName
  }

  getOrderByColumn = (): string => {
    if (!this.orderByColumn) {
      return 'created_at'
    }

    return this.orderByColumn
  }

  toObject = <T>(jsonString: T): T => {
    const clrequest: T = new Object(jsonString) as T

    return clrequest
  }

  update = async (docId: string, data: Record<string, any>) => {
    const collectionName: string = this.getCollectionName()
    const queryBuilder = new QueryBuilder(collectionName)

    await queryBuilder.updateColumns(collectionName, docId, data)
  }

  updateDoc = async (docId: string, updatedData: any) => {
    const collectionName: string = this.getCollectionName()
    const queryBuilder = new QueryBuilder(collectionName)
    try {
      await queryBuilder.updateDocument(docId, updatedData)
      return true;
    }catch (error) {
      return false
    }
  };

  getPaginated = async ({
    pageSize = 10,
    orderByColumn = "created_at",
    currentPage = 1,
    defaultQuery = null
  }: {
    pageSize?: number
    orderByColumn?: string
    currentPage?: number
    defaultQuery?: QueryFieldFilterConstraint[] | QueryConstraint[] | null
  } = {}) => {
    const collectionName: string = this.getCollectionName()
    const queryBuilder = new QueryBuilder(collectionName)

    const paginateQueryConf = {
      pageSize,
      orderByColumn,
      currentPage,
      defaultQuery
    }

    const driversCollResp = await queryBuilder.paginate(paginateQueryConf)

    const response = driversCollResp.get()

    return {
      ...paginateQueryConf,
      collection: response
    }
  }


  static pageCount = async (collectionName: string, pageSize: number = 10, defaultQuery?: QueryFieldFilterConstraint[]): Promise<number> => {
    const queryBuilder = new QueryBuilder(collectionName)

    const requestCollResp = await queryBuilder.getPageCount(pageSize, defaultQuery)

    return requestCollResp
  }

  static getAll = async (collectionName: string) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const requestCollResp = await queryBuilder.fetchCollectionData()

    if (requestCollResp.status === 'success') {
      return requestCollResp.data
    }

    return null
  }

  static getConditioned = async (collectionName: string, defaultQuery?: QueryFieldFilterConstraint[] | null) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const requestCollResp = await queryBuilder.fetchCollectionData(defaultQuery)

    if (requestCollResp.status === 'success') {
      return requestCollResp.data
    }

    return null
  }


  static find = async <T>(collectionName: string, id: string): Promise<T | null> => {
    let clrequest: T | null = null
    const requestData = await QueryBuilder.findDocData(collectionName, id)

    if (requestData?.status === 'success') {
      clrequest = requestData.data as T
    }

    if (!clrequest) {
      return null
    }

    return clrequest
  }

  static getItemCount = async (collectionName: string, defaultQuery?: QueryFieldFilterConstraint[]) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const itemCounter = await queryBuilder.itemCount(defaultQuery)

    return itemCounter
  }

  static create = async <T extends Record<string, any>>(collectionName: string, data: T) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const output = await queryBuilder.addDoc(collectionName, data)

    const docSnap = await getDoc(output);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      }
    }else {
      return null
    }
  }

  static updateAll = async (collectionName: string, data: Record<string, any>, defaultQuery: QueryConstraint[]) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const querySnapshot: any = await queryBuilder.fetchCollectionSnapshot(defaultQuery)

    await queryBuilder.updateAllColumns(collectionName, querySnapshot, data)
  }

  static getDated = async (collectionName: string, defaultQuery: QueryFieldFilterConstraint[]) => {
    const queryBuilder = new QueryBuilder(collectionName)
    await queryBuilder.fetchCollectionData(defaultQuery)

    return queryBuilder.get()
  }

  static getDateCount = async (collectionName: string, defaultQuery: QueryFieldFilterConstraint[]) => {
    const queryBuilder = new QueryBuilder(collectionName)
    const count = await queryBuilder.fetchCollectionCount(defaultQuery)

    return count
  }

  static getWhereIn = async (collectionName: string, data: string[]) => {
    const queryBuilder = new QueryBuilder(collectionName)

  const output = await queryBuilder.getWhereIn(data);

  return output;
  }
}

export default Model
