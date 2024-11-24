'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { signOut } from 'firebase/auth'

import { firebaseAuth } from '@/libs/firebase-config'
import { Button } from '@mui/material'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth)
      console.log('User signed out successfully')
      router.push('/auth/signin') // Redirect to login page, for example
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button
      fullWidth
      variant='contained'
      color='error'
      size='small'
      endIcon={<i className='ri-logout-box-r-line' />}
      onClick={e => {
        e.preventDefault()
        handleLogout()
      }}
      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
