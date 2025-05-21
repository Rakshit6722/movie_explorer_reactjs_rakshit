import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingFallback: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
    py={4}
  >
    <CircularProgress color="inherit" />
    <Typography variant="subtitle1" color="textSecondary" mt={2}>
      Loading, please wait…
    </Typography>
  </Box>
);

export default LoadingFallback;