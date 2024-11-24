// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Components Imports
import Carousel from '@/components/Carousel'
import { type RoomType } from '@/types/modelTypes/RoomType'
import Room from '@/models/Room'
import { Box, Card, CardContent } from '@mui/material'
import { type Timestamp } from 'firebase/firestore'
import dayjs from 'dayjs'

interface ClientComponentProps {
  data: RoomType | null
}

const RoomShow = ({ data }: ClientComponentProps) => {
  // Helper function to format Timestamps
  const formatDate = (timestamp: Timestamp | null) => {
    return timestamp ? dayjs(timestamp.toDate()).format('MMM DD, YYYY hh:mm A') : 'N/A'
  }

  if (!data) return <p>No data found.</p>
  const property = new Room()
  property.obj = data

  const images = [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuQs4iPtuqZr_S5x9Rc536WsTZ9nm7hSiFQ&s',
      alt: 'Image 1'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzE9hKPbPnTw5jf0QT6vOBeur1ZkMC2JXECWozAulqfj9RyK4fEudTtljQSFjjDuHBsW4&usqp=CAU',
      alt: 'Image 2'
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6l5DVqUsSBvDTv0ruDVZ4iMjmtLX2bnksQpfYcBif65OPLtUvIgd577yc7JidyLJklJ4&usqp=CAU',
      alt: 'Image 3'
    }
  ]

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <h4>Room Details</h4>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div>
                <Carousel images={images} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <h4>GENERAL INFORMATIONS</h4>
              <Divider />
              {/* Name */}
              <Box mb={2}>
                <Typography variant='h5' component='div' fontWeight='bold'>
                  No:_ {data.room_number}
                </Typography>
              </Box>

              {/* Address */}
              <Box mb={2}>
                <Typography variant='subtitle1' color='text.secondary'>
                  Type:
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                </Typography>
              </Box>

              {/* Address */}
              <Box mb={2}>
                <Typography variant='subtitle1' color='text.secondary'>
                  Price:
                </Typography>
                <Typography variant='body1'>{data.price}</Typography>
              </Box>

              {/* Description */}
              <Box mb={2}>
                <Typography variant='subtitle1' color='text.secondary'>
                  Description:
                </Typography>
                <Typography variant='body1'>{data.description || 'No description available.'}</Typography>
              </Box>

              {/* Created At and Updated At */}
              <Box mb={2}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Created At:
                </Typography>
                <Typography variant='body2'>{formatDate(data.created_at)}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default RoomShow
