'use client'

import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Rooms from '../../forms/rooms'
import { RoomsController } from '@/controllers/RoomsController'

type addRoomTypeProp = {
  propertyId: string
}

const AddRoomModal: React.FC<addRoomTypeProp> = ({ propertyId }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [formData, setFormData] = useState<Record<string, any>[] | []>([])

  const handleForm = async (data: any) => {
    setFormData(data)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await RoomsController.registerRooms(formData, propertyId)
    // setLoading(false)
  }

  return (
    <div>
      <Button variant='contained' color='primary' startIcon={<AddPhotoAlternateIcon />}
      onClick={handleOpen}>
        Add Rooms
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>Add New Rooms</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress color='primary'></CircularProgress>
          ) : (
            <div>
              <Rooms data={formData} onSave={handleForm}></Rooms>
            </div>
          )}
          {formData.length > 0 && (
            <Box>
              <Button variant='contained' color='primary' onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddRoomModal
