"use client"

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { isAuthorized } from '@/utils/roleUtils';
import PropertiesTableView from '@/views/hotelManager/properties/PropertiesTableView';

const PropertiesAllComponent = () => {
  const { role } = useAuth();

  if (!isAuthorized(role, ['hotelManager'])) {
    return <p>Access Denied</p>;
  }

  return (
    <PropertiesTableView />
  );
};

export default PropertiesAllComponent;
