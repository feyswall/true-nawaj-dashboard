'use client'

import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { RoomsController } from '@/controllers/RoomsController'
import {
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


type addRoomTypeProp = {
  propertyId: string,
  roomsAddedFunct: () => void
}



const AddRoomModal: React.FC<addRoomTypeProp> = ({ propertyId, roomsAddedFunct }) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [formData, setFormData] = useState<Record<string, any>[] | []>([])

  const handleForm = async (data: any) => {
    setFormData(data)
  }

  const handleSubmit = async () => {
    setIsSaved(true);
    setLoading(true)
    RoomsController.registerRooms(formData, propertyId).then(() => roomsAddedFunct() );
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
          {formData.length > 0 && !isSaved && (
            <Box style={{ marginTop: '16px' }}>
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

const Rooms = ({ data, onSave }: { data: any[]; onSave: (room: any) => void }) => {
  const [rooms, setRooms] = useState(data || [])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)

  useEffect(() => {
    if (data) {
      setRooms(data)
    }
  }, [data])

  const handleAddRoom = () => {
    setEditingRoom(null)
    setEditingIndex(null)
    setOpenDialog(true)
  }

  const handleEditRoom = (room: any, index: any) => {
    setEditingRoom(room)
    setEditingIndex(index)
    setOpenDialog(true)
  }

  const handleDeleteRoom = (index: any) => {
    const newRooms = rooms.filter((_, i) => i !== index)
    setRooms(newRooms)
    onSave(newRooms)
  }

  const handleSaveRoom = (roomData: any) => {
    let newRooms
    if (editingIndex !== null) {
      newRooms = rooms.map((room, index) => (index === editingIndex ? roomData : room))
    } else {
      newRooms = [...rooms, roomData]
    }
    setRooms(newRooms)
    onSave(newRooms)
    setOpenDialog(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant='h6'>Property Rooms</Typography>
          <Button variant='contained' onClick={handleAddRoom}>
            create
          </Button>
        </Box>

        <Grid container spacing={3}>
          {rooms.map((room, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>{room.roomType}</Typography>
                    <Box>
                      <IconButton onClick={() => handleEditRoom(room, index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRoom(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {room.description}
                  </Typography>
                  <Typography>Occupancy: {room.occupancy}</Typography>
                  <Typography>Base Price: ${room.basePrice}</Typography>
                  <Typography>High Season: ${room.seasonalPrices.highSeason}</Typography>
                  <Typography>Low Season: ${room.seasonalPrices.lowSeason}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth='md' fullWidth>
          <DialogTitle>{editingRoom ? 'Edit Room Type' : 'Add Room Type'}</DialogTitle>
          <DialogContent>
            <RoomForm room={editingRoom} onSave={handleSaveRoom} onCancel={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}

const RoomForm = ({ room, onSave, onCancel }:
  {room: any, onSave: (room: any) => void, onCancel: () => void}) => {
  const [roomData, setRoomData] = useState({
    roomType: '',
    description: '',
    occupancy: 1,
    basePrice: 0,
    roomNumber: '',
    seasonalPrices: {
      highSeason: 0,
      lowSeason: 0
    },
    ...room
  })

  const handleChange = field => event => {
    setRoomData({
      ...roomData,
      [field]: event.target.value
    })
  }

  const saveRooms = (roomData: any) => {
    onSave(roomData)
  }

  return (
    <Box component='form' sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label='Room Number'
            type='text'
            value={roomData.roomNumber}
            onChange={handleChange('roomNumber')}
            required
          />
        </Grid>
        {/* Room Type Dropdown */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label='Room Type'
            value={roomData.roomType}
            onChange={handleChange('roomType')}
            required
            SelectProps={{
              native: true
            }}
          >
            <option value='' disabled>
              Select Room Type
            </option>
            <option value='Single'>Single</option>
            <option value='Double'>Double</option>
            <option value='Suite'>Suite</option>
          </TextField>
        </Grid>

        {/* Occupancy Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Occupancy'
            type='number'
            value={roomData.occupancy}
            onChange={handleChange('occupancy')}
            required
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Description'
            multiline
            rows={3}
            value={roomData.description}
            onChange={handleChange('description')}
          />
        </Grid>

        {/* Pricing Fields */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Base Price'
            type='number'
            value={roomData.basePrice}
            onChange={handleChange('basePrice')}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='High Season Price'
            type='number'
            value={roomData.seasonalPrices.highSeason}
            onChange={event =>
              setRoomData({
                ...roomData,
                seasonalPrices: {
                  ...roomData.seasonalPrices,
                  highSeason: Number(event.target.value)
                }
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Low Season Price'
            type='number'
            value={roomData.seasonalPrices.lowSeason}
            onChange={event =>
              setRoomData({
                ...roomData,
                seasonalPrices: {
                  ...roomData.seasonalPrices,
                  lowSeason: Number(event.target.value)
                }
              })
            }
          />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant='contained' onClick={() => saveRooms(roomData)}>
          Save Room
        </Button>
      </Box>
    </Box>
  )
}



export {Rooms}
export default AddRoomModal
