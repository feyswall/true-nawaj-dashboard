"use client"

import { firestore } from "@/libs/firebase-config";
import Room from "@/models/Room";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
 } from "@mui/material";
 import EditIcon from '@mui/icons-material/Edit'
 import { format } from 'date-fns'
import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import AddRoomModal from "@/views/hotelManager/properties/rooms/addRoomModel";
import Link from "@/components/Link";
import Property from "@/models/Property";
import { useState } from "react";

type PropertyShowProps = {
  propertyId: string
}

const PropertyShowComponent: React.FC<PropertyShowProps> = ({ propertyId }) => {
  const [property, setProperty] = useState<Record<string, any> | null>(null);

    // Reference to the property doc
    const documentRef = doc(firestore, Property.collectionName, propertyId);
    const [propertySnapshot, propertyloading, propertyError] = useDocument(documentRef);


    // Define your collection query for property rooms
    const collectionRef = collection(firestore, Room.collectionName);
    const customQuery = query(collectionRef, where("propertyId", "==", propertyId));

    // Use useCollection hook
    const [roomsSnapshot, roomsloading, roomError] = useCollection(customQuery);

    if (propertyloading) {
      return <CircularProgress />
    }

  propertySnapshot?.data() && setProperty(propertySnapshot.data() as Property);

  if (property == null) {
    return <CircularProgress />;
  }

  return (
    <p>loading</p>
  )
}

export default PropertyShowComponent;
