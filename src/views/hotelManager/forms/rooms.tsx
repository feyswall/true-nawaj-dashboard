import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const RoomForm = ({ room, onSave, onCancel }) => {
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
        <Button variant='contained' onClick={() => onSave(roomData)}>
          Save Room
        </Button>
      </Box>
    </Box>
  )
}

const Rooms = ({ data, onSave }) => {
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

  const handleEditRoom = (room, index) => {
    setEditingRoom(room)
    setEditingIndex(index)
    setOpenDialog(true)
  }

  const handleDeleteRoom = index => {
    const newRooms = rooms.filter((_, i) => i !== index)
    setRooms(newRooms)
    onSave(newRooms)
  }

  const handleSaveRoom = roomData => {
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
          <Typography variant='h6'>Room Types</Typography>
          <Button variant='contained' onClick={handleAddRoom}>
            Add Room Type
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

export default Rooms
