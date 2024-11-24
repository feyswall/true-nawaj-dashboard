"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Box, Typography, Paper, Grid } from '@mui/material';

interface LatLng {
    lat: number;
    lng: number;
}

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

type LocationData = {
  lat: any,
  lng: any
}

interface LocationProp {
  data: Partial<LocationData>
  onSave: (data: BasicDetailsData) => void
}

export default function LocationPicker({ data, onSave }: LocationProp): JSX.Element {
  const [formData, setFormData] = useState<LocationData>({
    lat: data.lat,
    lng: data.lng,
    ...data
  })

  const handleChange = (location: {lat: any, lng: any}): void => {
    // const name = "location";
    const newData = {
      ...formData,
      lat: location.lat,
      lng: location.lng
    }
    setFormData(newData)
    onSave(newData)
  }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCu2D-3hiGxPtdnI3O9Hyy2XexKXI9CrE0', // Replace with your API key
    });

    const [center, setCenter] = useState<LatLng>({ lat: 37.7749, lng: -122.4194 });

    const [marker, setMarker] = useState<LatLng | null>(null);

    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setMarker({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
            handleChange({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
          });
        }
    }, []);

    useEffect(() => {
        // get public ip location coordinates and set map center
        fetch('https://ipapi.co/json/')
            .then((response) => response.json())
            .then((data) => {
                if (data.latitude && data.longitude) {
                    setCenter({
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching IP location:', error);
            });
    }, []);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={3}>
                {/* Left side - Map */}
                <Grid item xs={12} md={6}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={12}
                        center={center}
                        onClick={handleMapClick}
                    >
                        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
                    </GoogleMap>
                </Grid>

                {/* Right side - Instructions */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Select Your Location
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            How to pick a location:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Simply click anywhere on the map to drop a pin at your desired location.
                            The map will automatically center on your current location when loaded.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You can:
                        </Typography>
                        <Typography component="ul" sx={{ pl: 2 }}>
                            <li>Zoom in/out using the mouse wheel or map controls</li>
                            <li>Click to place a marker</li>
                            <li>Drag the map to explore different areas</li>
                        </Typography>
                        {marker && (
                            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                                Location selected at: {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};
