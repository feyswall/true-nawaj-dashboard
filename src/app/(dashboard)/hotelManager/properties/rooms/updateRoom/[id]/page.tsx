'use client';

import { useEffect, useState } from 'react';
import Room from '@/models/Room';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { RoomType } from '@/types/modelTypes/RoomType';

const roomTypes = ['single', 'double', 'suite'];

export default function UpdateRoom() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [roomData, setRoomData] = useState({
    room_number: '',
    type: 'single',
    basePrice: 0,
    hightPrice: 0,
    lowPrice: 0,
    occupancy: 1,
    description: '',
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await Room.find<RoomType|null>(Room.collectionName, params.id);
        console.log("fetching data logic is completed")
        if (data) {
          console.log(data)
          setRoomData({
            room_number: data.room_number,
            type: data.type,
            basePrice: data.basePrice,
            hightPrice: data.hightPrice,
            lowPrice: data.lowPrice,
            occupancy: data.occupancy,
            description: data.description,
          });
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch room data');
        setLoading(false);
      }
    };
    fetchRoom();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: name.includes('Price') || name === 'occupancy' ? Number(value) : value,
    }));
    console.log(roomData)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const room = new Room();
      await room.update(params.id as string, roomData);
      setSuccess(true);
      setTimeout(() => router.push('/hotelManager/properties/rooms'), 2000);
    } catch (err) {
      setError('Failed to update room');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Room
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Number"
                name="room_number"
                value={roomData.room_number}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Room Type"
                name="type"
                value={roomData.type}
                onChange={handleChange}
                required
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
              {/* <RoomTypeField room={roomData} onSave={handleChange} /> */}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Base Price"
                name="basePrice"
                value={roomData.basePrice}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="High Price"
                name="hightPrice"
                value={roomData.hightPrice}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Low Price"
                name="lowPrice"
                value={roomData.lowPrice}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Occupancy"
                name="occupancy"
                value={roomData.occupancy}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={roomData.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Update Room
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert severity="success">
          Room updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}


const RoomTypeField: React.FC<{ room: Record<string, any> }> = ({ room, onSave }) => {

  return (
    <FormControl fullWidth>
      <InputLabel id="room-type-label">Room Type</InputLabel>
      <Select
        labelId="room-type-label"
        value={room.type}
        onChange={onSave}
        label="Room Type"
      >
        {['single', 'double', 'suite'].map((menuItem) => (
          <MenuItem key={menuItem} value={menuItem}>
            {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
