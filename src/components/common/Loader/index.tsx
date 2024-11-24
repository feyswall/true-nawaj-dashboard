// src/components/common/Loader.tsx
import React from 'react';

import { Box, CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Full height, but you can customize this for specific use cases
      width="100%" // Full width
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
