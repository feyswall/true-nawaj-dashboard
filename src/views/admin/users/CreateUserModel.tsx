'use client'

import React, { useState } from 'react'
import { Box, Modal, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { createUser, setCustomClaims } from '@/libs/firebase-config'
import User from '@/models/User'
import { Timestamp } from 'firebase/firestore'
import { type UserType } from '@/types/modelTypes/UserType'

const CreateUserModel = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: ''
  })
  const [error, setError] = useState('')

  const [uid, setUid] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name!]: value })
  }

  const assignRole = async (data: Record<string, any>) => {
    try {
      const result = await setCustomClaims(data)
      let res: Record<string, any> = result.data as Record<string, any>
      if (res.code === 200) {
        setMessage('Role assigned successfully')
        } else {
          setMessage('Failed to assign role')
          }
          console.log(res.data);
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)

    const { password, passwordConfirm } = formData

    // Check if passwords match
    if (password !== passwordConfirm) {
      setError('Passwords do not match.')
      return
    }

    try {
      const result = await createUser(formData)
      let res: Record<string, any> = result.data as Record<string, any>
      let uid: string = res.uid as string
      setMessage(res.message)

      // give role
      const data = {
        uid: res.uuid,
        role: formData.role
        }
        assignRole(data)

      // create a user after this
      User.create<UserType>(User.collectionName, {
        uid: res.uuid,
        name: formData.username,
        role: formData.role,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      })
    } catch (error: any) {
      setMessage(error.message || 'Failed to create user')
    }

    // Add logic to send data to the backend or Firebase
    // try {
    //   const result = await setCustomClaims({ uid, role })
    //   setMessage(result.data.message)
    // } catch (error: any) {
    //   setMessage(error.message || 'Failed to set role')
    // }

    handleClose()
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Register New User
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant='h6' component='h2' marginBottom={2}>
            Register New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Username'
              name='username'
              fullWidth
              margin='normal'
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label='Email'
              name='email'
              type='email'
              fullWidth
              margin='normal'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              fullWidth
              margin='normal'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label='Confirm Password'
              name='passwordConfirm'
              type='password'
              fullWidth
              margin='normal'
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
            {error && (
              <Typography color='error' variant='body2' marginTop={1}>
                {error}
              </Typography>
            )}
            <FormControl fullWidth margin='normal' required>
              <InputLabel>Role</InputLabel>
              <Select name='role' value={formData.role} onChange={handleChange} displayEmpty>
                <MenuItem value='hotelManager'>Hotel Manager</MenuItem>
                <MenuItem value='aircraftManager'>Aitclaft Manager</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateUserModel
