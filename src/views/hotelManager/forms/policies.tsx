import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Policies = ({ data, onSave }) => {
  const [policies, setPolicies] = useState({
    checkInTime: dayjs('2022-01-01T14:00'),
    checkOutTime: dayjs('2022-01-01T11:00'),
    cancellationDeadline: 24,
    cancellationPenalty: 100,
    petsAllowed: false,
    smokingAllowed: false,
    partyAllowed: false,
    minAge: 18,
    depositRequired: false,
    depositAmount: 0,
    additionalPolicies: '',
  });

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setPolicies(data);
    }
  }, [data]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const newPolicies = { ...policies, [field]: value };
    setPolicies(newPolicies);
    onSave(newPolicies);
  };

  const handleTimeChange = (field) => (newValue) => {
    const newPolicies = { ...policies, [field]: newValue };
    setPolicies(newPolicies);
    onSave(newPolicies);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Property Policies
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Check-in Time"
              value={policies.checkInTime}
              onChange={handleTimeChange('checkInTime')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Check-out Time"
              value={policies.checkOutTime}
              onChange={handleTimeChange('checkOutTime')}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cancellation Deadline (hours)"
              type="number"
              value={policies.cancellationDeadline}
              onChange={handleChange('cancellationDeadline')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cancellation Penalty (%)"
              type="number"
              value={policies.cancellationPenalty}
              onChange={handleChange('cancellationPenalty')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Minimum Guest Age"
              type="number"
              value={policies.minAge}
              onChange={handleChange('minAge')}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={policies.depositRequired}
                  onChange={handleChange('depositRequired')}
                />
              }
              label="Security Deposit Required"
            />
          </Grid>

          {policies.depositRequired && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deposit Amount"
                type="number"
                value={policies.depositAmount}
                onChange={handleChange('depositAmount')}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={policies.petsAllowed}
                  onChange={handleChange('petsAllowed')}
                />
              }
              label="Pets Allowed"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={policies.smokingAllowed}
                  onChange={handleChange('smokingAllowed')}
                />
              }
              label="Smoking Allowed"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={policies.partyAllowed}
                  onChange={handleChange('partyAllowed')}
                />
              }
              label="Events/Parties Allowed"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Policies"
              value={policies.additionalPolicies}
              onChange={handleChange('additionalPolicies')}
              placeholder="Enter any additional policies or rules..."
            />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default Policies;
