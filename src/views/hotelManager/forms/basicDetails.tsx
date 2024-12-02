import React, { useState, useEffect, type ChangeEvent } from 'react'
import { Box, TextField, Grid, Typography } from '@mui/material'
import LocationPicker from '@/views/shared/LocationPicker'

type BasicDetailsData = {
  propertyName: string
  propertyType: string
  description: string
  address: string
  coordinates: { lat: number; lng: number } | {}
  city: string
  state: string
  country: string
  postalCode: string
}

interface BasicDetailsProps {
  data: Partial<BasicDetailsData>
  onSave: (data: BasicDetailsData) => void
}

export default function BasicDetails({ data, onSave }: BasicDetailsProps): JSX.Element {
  const [formData, setFormData] = useState<BasicDetailsData>({
    propertyName: '',
    propertyType: '',
    description: '',
    address: '',
    coordinates: {},
    city: '',
    state: '',
    country: '',
    postalCode: '',
    ...data
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    const newData = {
      ...formData,
      [name]: value
    }
    setFormData(newData)
    onSave(newData)
  }

  const handleLocationChange = (location: { lat: number; lng: number }): void => {
    const newData = {
      ...formData,
      coordinates: location
    }
    setFormData(newData)
    onSave(newData)
  }

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Basic Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label='Property Name'
            name='propertyName'
            value={formData.propertyName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            name='propertyType'
            label='Property Type'
            value={formData.propertyType}
            onChange={handleChange}
            required
            SelectProps={{
              native: true
            }}
          >
            <option value='' disabled>
              Select Property Type
            </option>
            <option value='hotel'>Hotel</option>
            <option value='apartment'>Apartment</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label='Address'
            name='address'
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth label='City' name='city' value={formData.city} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label='Country'
            name='country'
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label='state'
            name='state'
            value={formData.state}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label='Postal Code'
            name='postalCode'
            value={formData.postalCode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
