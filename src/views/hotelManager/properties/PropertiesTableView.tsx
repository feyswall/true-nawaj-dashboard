'use client'

import Typography from '@mui/material/Typography'
// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { Box, Card, CircularProgress, Link, Pagination } from '@mui/material'
import type { PropertyType } from '@/types/modelTypes/PropertyType'
import Property from '@/models/Property'
import React, { useState, useEffect } from 'react'
import { where, type WhereFilterOp, type QueryFieldFilterConstraint } from 'firebase/firestore'

type WhereClause = {
  field: string
  operator: WhereFilterOp // Type provided by Firebase for comparison operators
  value: any // Use `any` for flexibility or specify the type based on expected values
}

interface PropertiesProps {
  incomeDefaultQueryParams?: WhereClause[] // `name` prop is optional
}
const PropertiesTableView: React.FC<PropertiesProps> = ({ incomeDefaultQueryParams }) => {
  const ROWS_PER_PAGE: number = 3

  const [properties, setProperties] = useState()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [allItemCount, setAllItemCount] = useState(0)
  const [defaultQuery, setDefaultQuery] = useState<QueryFieldFilterConstraint[]>([])

  const propObject = new Property()

  // Update the query whenever currentPage changes
  useEffect(() => {
    const fetchQuery = async () => {
      let newDQ: QueryFieldFilterConstraint[] = defaultQuery;
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
        // setPropertiesQuery(resp)
        setProperties(resp.collection)
        Property.getItemCount(Property.collectionName, newDQ).then(resp => setAllItemCount(resp))
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

  if (!properties) {
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
              <th>Address</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((propValue, index) => {
              const property: PropertyType = propValue as any
              return (
                <tr key={index}>
                  <td>
                    <Typography>{++index + (currentPage - 1) * ROWS_PER_PAGE}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{property.name}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <div className='flex gap-2'>
                      <Typography color='text.primary'>{property.address}</Typography>
                    </div>
                  </td>
                  <td className='!pb-1'>{property.type}</td>
                  <td>
                    <Link href={`/hotelManager/properties/show/${property.id}`}>view</Link>
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

export default PropertiesTableView
