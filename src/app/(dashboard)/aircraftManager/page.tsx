"use client"

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorized } from '@/utils/roleUtils';

const AircraftManagerDashboardComponent = () => {
  const { role } = useAuth();

  if (!isAuthorized(role, ['aircraftManager'])) {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Aircraft Manager Dashboard</h1>
      <p>Welcome, Aircraft Manager!</p>
    </div>
  );
};

export default AircraftManagerDashboardComponent;
