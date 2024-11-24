import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';

interface AmenityItem {
  id: string;
  icon: string;
  label: string;
}

interface AmenitiesProps {
  amenities: AmenityItem[];
  data?: Record<string, boolean>;
  onSave: (selectedAmenities: Record<string, boolean>) => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities, data = {}, onSave }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>(() => {
    // Initialize with existing data or create empty object based on amenities
    if (Object.keys(data).length > 0) {
      return data;
    }
    return amenities.reduce((acc, amenity) => ({
      ...acc,
      [amenity.id]: false
    }), {});
  });

  const handleToggle = (id: string) => {
    const newSelectedAmenities = {
      ...selectedAmenities,
      [id]: !selectedAmenities[id]
    };
    setSelectedAmenities(newSelectedAmenities);
    onSave(newSelectedAmenities);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Available Amenities
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Choose all the amenities that your property offers to guests
      </Typography>

      <Grid container spacing={3}>
        {amenities.map((amenity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={selectedAmenities[amenity.id] ? 3 : 1}
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                bgcolor: selectedAmenities[amenity.id] ? 'primary.light' : 'background.paper',
                '&:hover': {
                  elevation: 3,
                  bgcolor: selectedAmenities[amenity.id] ? 'primary.light' : 'grey.50',
                },
              }}
              onClick={() => handleToggle(amenity.id)}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAmenities[amenity.id]}
                    onChange={() => handleToggle(amenity.id)}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span style={{ fontSize: '1.5rem' }}>{amenity.icon}</span>
                    <Typography>{amenity.label}</Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Amenities;
