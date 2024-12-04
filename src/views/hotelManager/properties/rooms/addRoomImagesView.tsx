import React, { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, CircularProgress } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Photos from '../../forms/photos'
import Room from '@/models/Room'
import { uploadImage } from '@/libs/firebase-config'
import { useParams } from 'next/navigation'

type imageUploadPropType = [
  roomId: string,
  reloadImages: () => void
]
const ImageUploadModal: React.FC<imageUploadPropType> = ({roomId, reloadImages}) => {
  const params = useParams()
  const { id } = params

  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleImageChange = (photos: any) => {
    setImages(photos)
  }

  const handleUpload = async (file: File): Promise<{ status: string; imageUrl?: string; message?: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64 = reader.result?.toString().split(',')[1]
        if (!base64) {
          resolve({ status: 'fail', message: 'Invalid image' })
          return
        }
        try {
          const response: Record<string, any> = await uploadImage({
            imageBase64: base64,
            filename: file.name
          })
          resolve({ status: 'success', imageUrl: response.data.image })
        } catch (error: any) {
          resolve({ status: 'fail', message: error.message })
        }
      }
      reader.onerror = error => {
        reject({ status: 'fail', message: 'Error reading file', error })
      }

      reader.readAsDataURL(file)
    })
  }

  const imageUpload = async () => {
    setLoading(true)
    if (images?.length > 0) {
      // Handle the image upload logic here
      const imagesUrl = []

      for (const photo of images) {
        const res: Record<string, any> = await handleUpload(photo)
        if (res.status === 'success') {
          imagesUrl.push(res.imageUrl)
        }
      }
      const roomInstance = new Room()
      const output = await Room.find(Room.collectionName, id as string)
      if (output) {
        const imageJointUrls = [...output.photos, ...imagesUrl];
        await roomInstance.updateDoc(id as string, { photos: imageJointUrls })
      }
      setLoading(false)
      reloadImages(); // Reload images after uploading
      setImages([]) // Clear images after uploading
      // Clear state after uploading
      handleClose();
    }
  }

  return (
    <div>
      {
        (
          <Button variant='contained' color='primary' startIcon={<AddPhotoAlternateIcon />} onClick={handleOpen}>
          Add Image
        </Button>
        )
      }
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>Add Room Images</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress color='primary'></CircularProgress>
          ) : (
            <div>
              <Box
                display='flex'
                justifyContent='flex-end' // Align items to the right
                padding={2} // Optional padding
              >
                {
                  images?.length > 0 && (
                    <Button variant='contained' color='primary' onClick={imageUpload}>
                    Save Images
                  </Button>
                  )
                }
              </Box>
              <Photos onSave={handleImageChange} data={images}></Photos>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImageUploadModal
