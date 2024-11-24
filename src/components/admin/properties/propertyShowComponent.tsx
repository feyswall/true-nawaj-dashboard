import Property from '@/models/Property'
import { type PropertyType } from '@/types/modelTypes/PropertyType'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Components Imports
import Carousel from '@/components/Carousel'
import PropertyOwnerInfoCard from '@/views/admin/properties/PropertyOwnerInfoCardView'
import RoomsTable from '@/views/admin/properties/rooms/propertyRoomsTable'
import { Box, Card, CardContent } from '@mui/material'

import dayjs from 'dayjs' // For formatting timestamps
import { type Timestamp } from 'firebase/firestore'
import Owner from '@/models/Owner'

interface ClientComponentProps {
  data: PropertyType | null
}

const PropertyShowComponent = async ({ data }: ClientComponentProps) => {
  // Helper function to format Timestamps
  const formatDate = (timestamp: Timestamp | null) => {
    return timestamp ? dayjs(timestamp.toDate()).format('MMM DD, YYYY hh:mm A') : 'N/A'
  }

  if (!data) return <p>No data found.</p>

  const property = new Property(data)
  const propOwner: any = await property.oneOwner()
  const owner: any = new Owner(propOwner)

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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {data.name.toUpperCase()} {data.type.toUpperCase()}
        </Typography>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <h4>{data.type.toUpperCase()} VIEWS</h4>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div>
                  <Carousel images={images} />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <h4>{data.type.toUpperCase()} GENERAL INFORMATIONS</h4>
                <Divider />
                {/* Name */}
                <Box mb={2}>
                  <Typography variant='h5' component='div' fontWeight='bold'>
                    {data.name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                  </Typography>
                </Box>

                {/* Address */}
                <Box mb={2}>
                  <Typography variant='subtitle1' color='text.secondary'>
                    Address:
                  </Typography>
                  <Typography variant='body1'>{data.address}</Typography>
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

      <Grid item xs={12} sm={6} md={4}>
        <PropertyOwnerInfoCard owner={propOwner!} />
      </Grid>

      <Grid item xs={12} md={8}>
        {/* <CardLifetimeMembership /> */}
        <Card>
          <CardContent>
            <span>
              <b>The {data.type} Rooms</b>
            </span>
            <RoomsTable incomeDefaultQueryParams={[{ field: 'property_id', operator: '==', value: property.obj.id }]} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12}>
        {/* <CardLifetimeMembership /> */}
        <Card>
          <CardContent>
            <>
              <Typography>{propOwner?.name.toUpperCase()}'S OTHER PROPERTIES</Typography>
            </>
            {/* <PropertiesTable incomeDefaultQueryParams={[{ field: 'owner_id', operator: '==', value: owner.obj?.id }]} /> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PropertyShowComponent
