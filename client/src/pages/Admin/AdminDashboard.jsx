import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

export default function AdminDashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1">
            Use the menu to navigate between modules and manage your content.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
