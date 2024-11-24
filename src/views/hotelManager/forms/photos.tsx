import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Define the shape of our photo object
interface PhotoFile extends File {
  preview: string;
}

// Define the component props
interface PhotosProps {
  data?: PhotoFile[];
  onSave: (photos: PhotoFile[]) => void;
}

export default function Photos({ data, onSave }: PhotosProps): JSX.Element {
  const [photos, setPhotos] = useState<PhotoFile[]>(data || []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Convert files to objects with preview URLs
    const newPhotos = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })) as PhotoFile[];

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onSave(updatedPhotos);
  }, [photos, onSave]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const removePhoto = (index: number): void => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onSave(updatedPhotos);
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop photos here, or click to select files"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supports: JPG, JPEG, PNG
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={photo.preview}
                alt={`Photo ${index + 1}`}
                sx={{ objectFit: 'cover' }}
              />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removePhoto(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
