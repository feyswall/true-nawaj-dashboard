'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { isAuthorized } from '@/utils/roleUtils'
import PropertiesTableView from '@/views/hotelManager/properties/PropertiesTableView'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

const PropertiesAllComponent = () => {
  const { role } = useAuth()

  if (!isAuthorized(role, ['hotelManager'])) {
    return <p>Access Denied</p>
  }

  return (
    <div>
      <Box>
        <Link href={`/hotelManager/properties/register`}>
        <Button variant='contained' color='primary'>
          Register New property
        </Button>
        </Link>
      </Box>
      <PropertiesTableView />
    </div>
  )
}

export default PropertiesAllComponent
