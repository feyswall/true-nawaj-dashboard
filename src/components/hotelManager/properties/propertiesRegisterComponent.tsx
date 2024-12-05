'use client'

import React, { useState } from 'react'
import { Box, Stepper, Step, StepLabel, Button, Typography, Paper, Container, CircularProgress } from '@mui/material'

// Form components for each step
import BasicDetails from '@/views/hotelManager/forms/basicDetails'
import Amenities from '@/views/hotelManager/forms/amenities'
import Photos from '@/views/hotelManager/forms/photos'
import Contact from '@/views/hotelManager/forms/contact'
import Policies from '@/views/hotelManager/forms/policies'
import Rooms from '@/views/hotelManager/forms/rooms'
import { uploadImage, firestore as db } from '@/libs/firebase-config'
import Property from '@/models/Property'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Timestamp, collection, QueryFieldFilterConstraint, where } from 'firebase/firestore'
import Amenity from '@/models/Amenity'
import { useAuth } from '@/hooks/useAuth'
import Room from '@/models/Room'
import { useRouter } from 'next/navigation'
import LocationPicker from '@/views/shared/LocationPicker'
import { RoomsController } from '@/controllers/RoomsController'
import { FilesController } from '@/controllers/FilesController'
import { PropertiesController } from '@/controllers/PropertiesController'

interface AmenityType {
  icon: string
  label: string
}

interface FormDataType {
  basicDetails: Record<string, any>
  location: Record<string, any>
  amenities: Record<string, boolean>
  photos: string[]
  contact: Record<string, any>
  policies: Record<string, any>
  rooms: Array<Record<string, any>>
}

interface StepContentProps {
  step: number
  formData: FormDataType
  handleFormData: (step: keyof FormDataType, data: any) => void
}

const steps: string[] = ['Basic Details', 'Location', 'Amenities', 'Photos', 'Contact', 'Policies', 'Rooms']

const initialFormData: FormDataType = {
  basicDetails: {},
  location: {},
  amenities: {},
  photos: [],
  contact: {},
  policies: {},
  rooms: []
}

export default function RegisterPropertyFormComponent(): JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [formData, setFormData] = useState<FormDataType>(initialFormData)
  const [property, setProperty] = useState<Record<string, any> | null>(null)
  const [submitting, setSubmitting] = useState<string>('false')

  const { user, role } = useAuth()
  const router = useRouter()

  const [amenitiesListote, amenitiesLoading, amenitiesError] = useCollection(collection(db, Amenity.collectionName))

  // Transform the data
  const amenitiesList = amenitiesListote?.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      label: data.name, // Ensure 'label' exists in Firestore data
      icon: data.iconHexCode || 'default-icon' // Use 'icon' field or fallback
    }
  })

  const registerBasicDetails = async (formData: FormDataType, property: Record<string, any> | null) => {
    const { basicDetails } = formData;
    // start creating the data
    return await PropertiesController.registerBasicDetails(basicDetails, user?.uid);
  }

  const registerCoordinates = async (formData: FormDataType, propertyId: string) => {
    const { location } = formData
    await PropertiesController.updateCoordinates(location, propertyId);
  }

  const registerAmenities = async (formData: FormDataType, propertyId: string) => {
    const { amenities } = formData
    await PropertiesController.updateAmenities(amenities, propertyId);
  }


  const registerPhotos = async (formData: FormDataType, propertyId: string) => {
    const { photos } = formData
    let convPhotos = photos as any;
    await PropertiesController.updatePhotos(convPhotos, propertyId);
  }

  const registerContact = async (formData: FormDataType, propertyId: string) => {
    const { contact } = formData
    await PropertiesController.updateContacts(contact, propertyId);
  }

  const registerPolicy = async (FormData: FormDataType, propertyId: string) => {
    const { policies } = FormData
    await PropertiesController.updatePolicies(policies, propertyId);
  }

  const registerRooms = async (FormData: FormDataType, propertyId: string) => {
    // start by registering the rooms
    const { rooms } = FormData

    rooms.forEach(async room => {
      await RoomsController.registerRooms(rooms, propertyId);
    })
  }

  const handleNext = (): void => {
    setActiveStep(prevStep => prevStep + 1)
    console.log(formData)
  }

  const handleBack = (): void => {
    setActiveStep(prevStep => prevStep - 1)
  }

  const handleFormData = (step: keyof FormDataType, data: any): void => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }))
  }

  const getStepContent = (step: number): JSX.Element | string => {
    switch (step) {
      case 0:
        return <BasicDetails data={formData.basicDetails} onSave={(data: any) => handleFormData('basicDetails', data)} />
      case 1:
        return <LocationPicker data={formData.location} onSave={(data: any) => handleFormData('location', data)} />
      case 2:
        return <Amenities amenities={amenitiesList} data={formData.amenities} onSave={data => handleFormData('amenities', data)} />
      case 3:
        return <Photos data={formData.photos} onSave={(data: string[]) => handleFormData('photos', data)} />
      case 4:
        return <Contact data={formData.contact} onSave={(data: any) => handleFormData('contact', data)} />
      case 5:
        return <Policies data={formData.policies} onSave={(data: any) => handleFormData('policies', data)} />
      case 6:
        return (
          <Rooms data={formData.rooms} onSave={(data: Array<Record<string, any>>) => handleFormData('rooms', data)} />
        )
      default:
        return 'Unknown step'
    }
  }

  const handleSubmit = async (): void => {
    setSubmitting('true')
    // Handle final form submission
    const output = await registerBasicDetails(formData, property)
    setProperty(output)
    if (output) {
      registerCoordinates(formData, output.id)
      registerAmenities(formData, output.id)
      registerPhotos(formData, output.id)
      registerContact(formData, output.id)
      registerPolicy(formData, output.id)
      registerRooms(formData, output.id)
      router.push(`/hotelManager/properties/show/${output.id}`)
    }
    // setSubmitting(false)
  }

  return (
    <Container maxWidth='lg'>
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ mt: 2, mb: 1 }}>All steps completed!</Typography>
              {submitting == 'true' ? (
                <CircularProgress />
              ) : submitting == 'false' ? (
                <Button onClick={handleSubmit} variant='contained' sx={{ mt: 2 }}>
                  Submit
                </Button>
              ) : (
                <div>
                  <CircularProgress color='primary' />
                  <Typography sx={{ mt: 2, mb: 1 }}>Submitted Successfully</Typography>
                </div>
              )}
            </Box>
          ) : (
            <Box>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant='contained' onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  )
}
