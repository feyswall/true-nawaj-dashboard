'use client'

import Typography from '@mui/material/Typography'
// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { Box, Card, CircularProgress, Pagination } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { where, type WhereFilterOp, type QueryFieldFilterConstraint } from 'firebase/firestore'
import Owner from '@/models/Owner'
import { type OwnerType } from '@/types/modelTypes/OwnerType'

type WhereClause = {
  field: string
  operator: WhereFilterOp // Type provided by Firebase for comparison operators
  value: any // Use `any` for flexibility or specify the type based on expected values
}

interface componentProps {
  incomeDefaultQueryParams?: WhereClause[] // `name` prop is optional
}
const PropertiesOwnersTableView: React.FC<componentProps> = ({ incomeDefaultQueryParams }) => {
  const ROWS_PER_PAGE: number = 3

  const [owners, setOwners] = useState()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [allItemCount, setAllItemCount] = useState(0)
  const [defaultQuery, setDefaultQuery] = useState<QueryFieldFilterConstraint[]>([])

  const dynamicClass: { new (): Owner } = Owner
  const modelObject = new dynamicClass()

  // static model
  const staticModel = Owner;


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
        const resp = await modelObject.getPaginated({
          currentPage: currentPage,
          pageSize: ROWS_PER_PAGE,
          orderByColumn: modelObject.orderByColumn,
          defaultQuery: newDQ
        })
        // setOwnersQuery(resp)
        setOwners(resp.collection)
        staticModel.getItemCount(staticModel.collectionName, newDQ).then(resp => setAllItemCount(resp))
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

  if (!owners) {
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
              <th>about me</th>
            </tr>
          </thead>
          <tbody>
            {owners?.map((objValue, index) => {
              const owner: OwnerType = objValue as any
              return (
                <tr key={index}>
                  <td>
                    <Typography>{++index + (currentPage - 1) * ROWS_PER_PAGE}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{owner.name}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <div className='flex gap-2'>
                      <Typography color='text.primary'>{owner.about_me}</Typography>
                    </div>
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

export default PropertiesOwnersTableView
