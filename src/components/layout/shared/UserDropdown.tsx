import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import UserDropdownAdmin from './userDropdows/admin/UserDropdownAdmin'
import UserDropdownHotelManager from './userDropdows/hotelManager/UserDropdownHotelManagaer'
import { CircularProgress } from '@mui/material'

const UserDropdown: React.FC = () => {
  const { user, role } = useAuth()

  if (!user) {
    return <CircularProgress />
  }
  {
    if (role === 'admin') {
      return <UserDropdownAdmin user={user} />
    } else if (role == 'hotelManager') {
      return <UserDropdownHotelManager user={user} />
    } else {
      return <UserDropdownAdmin user={user} />
    }
  }
}

export default UserDropdown
