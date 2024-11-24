'use client'

import React, { useEffect, useState, type ChangeEvent } from 'react'

import { Pagination } from '@mui/material'

import Table from '@mui/material/Table'

import TableBody from '@mui/material/TableBody'

import TableCell from '@mui/material/TableCell'

import TableContainer from '@mui/material/TableContainer'

import TableHead from '@mui/material/TableHead'

import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'

import { Timestamp, type QueryConstraint, type QueryFieldFilterConstraint } from 'firebase/firestore'

import type Model from '@/models/model'
import { PropertyType } from '@/types/modelTypes/PropertyType'
import QueryBuilder from '@/queries/QueryBuilder'
import Property from '@/models/Property'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

interface GenericTableProps {
  modelObject: Model,
  defaultQuery?: QueryConstraint[] | QueryFieldFilterConstraint[] | null,
  orderByColumn?: string,
}

const GenericTable: React.FC<GenericTableProps> = ({ modelObject, defaultQuery, orderByColumn }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage])

  const fetchPageData = (
    currentPage: number,
    defaultQuery?: QueryFieldFilterConstraint[] | QueryConstraint[] | null,
    orderByColumn?: string,
  ) => {

    modelObject
      .getPaginated({
        currentPage: currentPage,
        orderByColumn: orderByColumn,
        defaultQuery: defaultQuery
      })
      .then(resp => {
        // console.log(resp)
      })
      const property = new Property()
      Property.create<PropertyType>(Property.collectionName, {
        name: 'ashura',
        address: "madafu",
        description: "none",
        type: 'hotel',
        owner_id: "ownerInPlace",
        created_at: Timestamp.now(),
        updated_at: null
      }).then(resp => console.log(resp));

  }

  return (
    <div>
      <DenseTable />
      <Pagination
        count={10} // Total number of pages
        page={currentPage} // Set the current page
        onChange={(event: ChangeEvent<unknown>, page: number) => {
          event.preventDefault()
          setCurrentPage(page)
        }}
        color='primary'
      />
      <h1>Users Lists down</h1>
    </div>
  )
}

export function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GenericTable
