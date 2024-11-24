import React from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
} from '@mui/material';

export default function Contact({ data, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onSave({
      ...data,
      [name]: value
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Contact Person Name"
            name="contactName"
            value={data.contactName || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={data.phoneNumber || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={data.email || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Alternative Phone Number"
            name="alternativePhone"
            value={data.alternativePhone || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={3}
            value={data.address || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={data.city || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={data.postalCode || ''}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
