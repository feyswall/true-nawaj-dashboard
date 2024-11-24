import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { format } from 'date-fns'
import Property from '@/models/Property'
import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/libs/firebase-config'
import Room from '@/models/Room'
import Link from 'next/link'

interface PropertyPageProps {
  params: {
    id: string
  }
}

const PropertyPage: React.FC<PropertyPageProps> = async ({ params }) => {
  // Fetch data here using params.id
  const { id } = params
  const property: any = await Property.find(Property.collectionName, id)

  // Fetch rooms for this property
  const propertyInstance = new Property(property)

  const rooms = await propertyInstance.manyRooms()

  // Add rooms to property object
  property.rooms = rooms

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Property Details
      </Typography>
      {/* Basic Details Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Basic Details</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Edit Details
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                Name
              </Typography>
              <Typography>{property.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                Type
              </Typography>
              <Typography>{property.type}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                Description
              </Typography>
              <Typography>{property.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                Status
              </Typography>
              <Chip label={property.status} color={property.status === 'Active' ? 'success' : 'default'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Location Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Location</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Edit Location
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                Address
              </Typography>
              <Typography>{property.location.address}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant='subtitle2' color='text.secondary'>
                City
              </Typography>
              <Typography>{property.location.city}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant='subtitle2' color='text.secondary'>
                State
              </Typography>
              <Typography>{property.location.state}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant='subtitle2' color='text.secondary'>
                Country
              </Typography>
              <Typography>{property.location.country}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant='subtitle2' color='text.secondary'>
                Zip Code
              </Typography>
              <Typography>{property.location.zipCode}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Photos Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Photos</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Manage Photos
            </Button>
          </Box>

          <ImageList sx={{ width: '100%' }} cols={3} rowHeight={200}>
            {property.photos.map((photo, index) => (
              <ImageListItem key={index}>
                <img src={photo} alt={`Property photo ${index + 1}`} loading='lazy' />
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>
      {/* Contact Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Contact Information</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Edit Contact
            </Button>
          </Box>

          <Grid container spacing={2}>
            {Object.entries(property.contact).map(([key, value], index) => (
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle2' fontWeight='bold' color='text.secondary'>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography>{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {/* Policies Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Policies</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Edit Policies
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Check-in Time
              </Typography>
              <Typography>{format(property.policies.checkIn.toDate(), 'h:mm a')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Check-out Time
              </Typography>
              <Typography>{format(property.policies.checkOut.toDate(), 'h:mm a')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='subtitle2' color='text.secondary'>
                Minimum Age
              </Typography>
              <Typography>{property.policies.minAge} years</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' color='text.secondary'>
                House Rules
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                <Chip
                  label={`Pets ${property.policies.petsAllowed ? 'Allowed' : 'Not Allowed'}`}
                  color={property.policies.petsAllowed ? 'success' : 'error'}
                />
                <Chip
                  label={`Smoking ${property.policies.smokingAllowed ? 'Allowed' : 'Not Allowed'}`}
                  color={property.policies.smokingAllowed ? 'success' : 'error'}
                />
                <Chip
                  label={`Parties ${property.policies.partyAllowed ? 'Allowed' : 'Not Allowed'}`}
                  color={property.policies.partyAllowed ? 'success' : 'error'}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2' color='text.secondary'>
                Cancellation property.Policies
              </Typography>
              <Typography>{property.policies.cancellationPolicies}</Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                Deadline: {property.policies.cancellationDeadline} days before check-in
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Penalty: {property.policies.cancellationPenalty}%
              </Typography>
            </Grid>
            {property.policies.depositRequired && (
              <Grid item xs={12}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Deposit Required
                </Typography>
                <Typography>${property.policies.depositAmount}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Rooms Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>Rooms</Typography>
            <Button startIcon={<EditIcon />} variant='outlined'>
              Add Room
            </Button>
          </Box>

          <Typography variant='subtitle1' color='text.secondary' sx={{ mb: 1 }}>
            Manage all rooms associated with this property
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            View and manage room details, including room numbers, types, and pricing. Click on 'Manage' to edit
            individual room settings or 'Add Room' to create new rooms.
          </Typography>
          <Grid container spacing={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align='right'>Price per Night</TableCell>
                  <TableCell align='right'>action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {property.rooms?.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell>{room.room_number}</TableCell>
                    <TableCell>{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</TableCell>
                    <TableCell align='right'>${room.basePrice}</TableCell>
                    <TableCell align='right'>
                      <Link href={`/hotelManager/properties/rooms/updateRoom/${room.id}`}>
                        <Button startIcon={<EditIcon />} variant='contained' size='small'>
                          Manage
                        </Button>
                      </Link>
                      <Button startIcon={<DeleteIcon />} variant='contained' size='small' color='red'>
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PropertyPage
