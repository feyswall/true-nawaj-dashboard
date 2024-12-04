'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { isAuthorized } from '@/utils/roleUtils'
import PropertiesTableView from '@/views/hotelManager/properties/PropertiesTableView'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { where, WhereFilterOp } from 'firebase/firestore'

const PropertiesAllComponent = () => {
  const { role, user } = useAuth()

  type WhereClause = {
    field: string
    operator: WhereFilterOp // Type provided by Firebase for comparison operators
    value: any // Use `any` for flexibility or specify the type based on expected values
  }
  const defaultQuery: any = [
    {field: 'managerId', operator: '==', value: user?.uid }
  ]

  if (!isAuthorized(role, ['hotelManager'])) {
    return <p>Access Denied</p>
  }

  return (
    <div>
      <Box sx={{ marginBottom: 2 }}>
        <Link href={`/hotelManager/properties/register`}>
        <Button variant='contained' color='primary'>
          Register New property
        </Button>
        </Link>
      </Box>
      <PropertiesTableView incomeDefaultQueryParams={defaultQuery} />
    </div>
  )
}

export default PropertiesAllComponent
