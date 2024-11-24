import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  getCountFromServer,
  addDoc,
  where,
  documentId
} from 'firebase/firestore'

import type {
  QueryFieldFilterConstraint,
  QueryConstraint,
  DocumentData,
  Query,
  QuerySnapshot,
  FieldPath
} from 'firebase/firestore'

import { firestore as db } from '@/libs/firebase-config'

import type paginateQueryConf from '@/types/TpaginateConfig'

class QueryBuilder {
  querySnapshot: QuerySnapshot | null = null
  collectionName: string
  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  fetchCollectionSnapshot = async (defaultQuery?: QueryConstraint[]) => {
    // Reference to the collection
    const querySnapshot = await getDocs(this.generalDefaultQuery(defaultQuery))

    return querySnapshot
  }

  fetchCollectionData = async (defaultQuery?: QueryConstraint[] | null) => {
    try {
      // Reference to the collection
      const querySnapshot = await getDocs(this.generalDefaultQuery(defaultQuery))

      // Extract and process the data
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return { status: 'success', data: dataList }
    } catch (error) {
      return { message: 'Error fetching collection data', status: 'fail' }
    }
  }

  fetchCollection = async (defaultQuery: QueryFieldFilterConstraint[]) => {
    const inSnapshotQuery = query(collection(db, this.collectionName), ...defaultQuery)

    this.querySnapshot = await getDocs(inSnapshotQuery)

    return this
  }

  fetchCollectionCount = async (defaultQuery: QueryFieldFilterConstraint[]) => {
    const inSnapshotQuery = query(collection(db, this.collectionName), ...defaultQuery)

    const countSnapshot = await getCountFromServer(inSnapshotQuery)

    return countSnapshot.data().count
  }

  static findDocData = async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(db, collectionName, docId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return {
          status: 'success',
          data: {
            id: docSnap.id,
            ...docSnap.data()
          }
        }
      } else {
        return null
      }
    } catch (error) {
      return { message: 'Error fetching collection data', status: 'fail' }
    }
  }

  private pageCountDefaultQuery = (defaultQuery: QueryConstraint[] | null): Query<DocumentData, DocumentData> => {
    return defaultQuery != null && defaultQuery != undefined
      ? query(collection(db, this.collectionName), ...defaultQuery)
      : query(collection(db, this.collectionName))
  }

  getPageCount = async (pageSize: number, defaultQuery?: QueryFieldFilterConstraint[]): Promise<number> => {
    // getting page count
    const queryParam = defaultQuery ?? null
    const snapshot = await getCountFromServer(this.pageCountDefaultQuery(queryParam))
    const count = snapshot.data().count
    const pageCountFloat = count / pageSize

    return Math.ceil(pageCountFloat)
  }

  private generalDefaultQuery = (
    defaultQuery?: QueryConstraint[] | QueryFieldFilterConstraint[] | null
  ): Query<DocumentData, DocumentData> => {
    return defaultQuery != null && defaultQuery != undefined
      ? query(collection(db, this.collectionName), ...defaultQuery)
      : query(collection(db, this.collectionName))
  }

  itemCount = async (queryParam?: QueryConstraint[] | null): Promise<number> => {
    const snapshot = await getCountFromServer(this.generalDefaultQuery(queryParam))
    const count = snapshot.data().count

    return count
  }

  private defaultPaginateQuery = async (
    currentPage: number,
    orderByColumn: string,
    pageSize: number,
    startAfterThis: number,
    defaultQuery: QueryFieldFilterConstraint[] | null
  ): Promise<Query<DocumentData, DocumentData>> => {
    const collectionRef = collection(db, this.collectionName)

    if (currentPage == 1) {
      return defaultQuery != null
        ? query(collectionRef, ...defaultQuery, orderBy(orderByColumn), limit(pageSize))
        : query(collectionRef, orderBy(orderByColumn), limit(pageSize))
    }

    const snapShotLast =
      defaultQuery != null
        ? query(collectionRef, ...defaultQuery, orderBy(orderByColumn))
        : query(collectionRef, orderBy(orderByColumn))

    const lastVisible = await getDocs(snapShotLast).then(querySnapshot => {
      return querySnapshot.docs[querySnapshot.docs.length - (querySnapshot.docs.length - startAfterThis) - 1]
    })

    return defaultQuery != null
      ? query(collectionRef, ...defaultQuery, orderBy(orderByColumn), startAfter(lastVisible), limit(pageSize))
      : query(collectionRef, orderBy(orderByColumn), startAfter(lastVisible), limit(pageSize))
  }

  paginate = async ({
    orderByColumn = 'created_at',
    pageSize,
    currentPage,
    defaultQuery
  }: paginateQueryConf): Promise<QueryBuilder> => {
    const startAfterThis = pageSize * (currentPage - 1)

    const snapQuery = await this.defaultPaginateQuery(
      currentPage,
      orderByColumn,
      pageSize,
      startAfterThis,
      defaultQuery ?? null
    )

    this.querySnapshot = await getDocs(snapQuery!)

    return this
  }

  updateColumns = async (collectionName: string, docId: string, data: Record<string, any>) => {
    const docRef = doc(db, collectionName, docId)

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, data)
  }

  updateDocument = async (docId: string, updatedData: any) => {
    try {
      // Reference the document
      const docRef = doc(db, this.collectionName, docId); // Replace 'collectionName' with your collection

      // Update the document
      await updateDoc(docRef, updatedData);

      console.log(`Document with ID ${docId} updated successfully.`);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  updateAllColumns = async (collectionName: string, snapShotToUpdate: QuerySnapshot, data: Record<string, any>) => {
    // Loop through each document and update the 'status' field to true
    const updatePromises = snapShotToUpdate.docs.map(docSnapshot => {
      const docRef = doc(db, collectionName, docSnapshot.id)

      return updateDoc(docRef, data)
    })

    // Wait for all updates to complete
    await Promise.all(updatePromises)
  }

  addDoc = async (collectionName: string, data: Record<string, any>) => {
    const docRef = await addDoc(collection(db, collectionName), data)

    return docRef
  }

  getWhereIn = async (ids: string[] | []) => {
    try {

      // Create a query against the "products" collection
      const q = query(collection(db, this.collectionName), where(documentId(), 'in', ids))

      // Execute the query
      const querySnapshot = await getDocs(q)

      // Collect the product data
      const modelObjects: any[] = []

      querySnapshot.forEach(doc => {
        modelObjects.push({ id: doc.id, ...doc.data() })
      })
      console.log('data fetched just fine')

      return modelObjects
    } catch (error) {
      console.error('Error fetching products: ', error)

      return []
    }
  }

  get = () => {
    // Extract and process the data
    const dataList = this.querySnapshot?.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return dataList
  }
}

export default QueryBuilder
