'use client'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { Box, Card, CircularProgress, Link, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { where, type WhereFilterOp, type QueryFieldFilterConstraint, Timestamp } from 'firebase/firestore'
import User from '@/models/User'
import { type UserType } from '@/types/modelTypes/UserType'
import Typography from '@mui/material'
import dayjs from 'dayjs'

type WhereClause = {
  field: string
  operator: WhereFilterOp // Type provided by Firebase for comparison operators
  value: any // Use `any` for flexibility or specify the type based on expected values
}

interface usersProp {
  incomeDefaultQueryParams?: WhereClause[] // `name` prop is optional
}
const UsersTableView: React.FC<usersProp> = ({ incomeDefaultQueryParams }) => {

  const ROWS_PER_PAGE: number = 3
  const formatDate = (timestamp: Timestamp | null) => {
    return timestamp ? dayjs(timestamp.toDate()).format('MMM DD, YYYY hh:mm A') : 'N/A'
  };

  const [users, setUsers] = useState<any>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [allItemCount, setAllItemCount] = useState(0)
  const [defaultQuery, setDefaultQuery] = useState<QueryFieldFilterConstraint[]>([])

  const propObject = new User()

  // Update the query whenever currentPage changes
  useEffect(() => {
    const fetchQuery = async () => {
      const newDQ: QueryFieldFilterConstraint[] = defaultQuery
      // proccessing the incoming query
      if (!defaultQuery || defaultQuery.length < 1) {
        incomeDefaultQueryParams?.forEach((newFilter: WhereClause) => {
          newDQ.push(where(newFilter.field, newFilter.operator, newFilter.value))
        })
      }

      setDefaultQuery(newDQ)
      try {
        const resp = await propObject.getPaginated({
          currentPage: currentPage,
          pageSize: ROWS_PER_PAGE,
          orderByColumn: propObject.orderByColumn,
          defaultQuery: newDQ
        })
        // setUsersQuery(resp)
        setUsers(resp.collection ?? [])
        User.getItemCount(User.collectionName, newDQ).then(resp => setAllItemCount(resp))
      } catch (error) {
        console.error('Error fetching query:', error)
      }
    }
    fetchQuery()
  }, [currentPage, ROWS_PER_PAGE])

  // Handle page change
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setCurrentPage(newPage) // MUI Pagination is 1-based, so we subtract 1
  }

  if (!users) {
    return <CircularProgress />
  }

  return (
    <Card>
      <h2>Data count {allItemCount ?? 0} </h2>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>No:_</th>
              <th>Name</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((propValue, index) => {
              const user: UserType = propValue as any
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    {formatDate(user.created_at)}
                    </td>
                  <td>
                  <Link href={`/admin/users/show/${user.id}`}>view</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Box display='flex' justifyContent='center' mt={2} mb={2}>
          <Pagination
            count={Math.ceil((allItemCount ?? 1) / ROWS_PER_PAGE)}
            page={currentPage} // Convert zero-based index to 1-based for MUI Pagination
            onChange={handleChangePage}
            color='primary'
          />
        </Box>
      </div>
    </Card>
  )
}

export default UsersTableView
