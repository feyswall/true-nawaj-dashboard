import { Timestamp, type DocumentReference } from 'firebase/firestore';

import Property from '@/models/Property';

import type { PropertyType } from '@/types/modelTypes/PropertyType'
import { FormDataType } from '@/types/modelTypes/propertiesBasicDetailsType';
import { FilesController } from './FilesController';

export class PropertiesController {

  public create = async <T extends PropertyType>(data: T): Promise<Record<string, any>|null> => {
    const myDatas = {
      address: data.address,
      created_at: `${data.created_at}`,
      description: data.description,
      name: data.name,
      type: data.type,
      updated_at: data.updated_at
    };
    const output = await Property.create<Record<string, any>>(Property.collectionName, myDatas);
    return output;
  }

  static registerBasicDetails = async (basicDetails: Record<string, any>, userId: string ) => {
    const data = {
      managerId: userId,
      name: basicDetails.propertyName,
      description: basicDetails.description,
      type: basicDetails.propertyType,
      showAsPopular: false,
      status: 'Active',
      location: {
        address: basicDetails.address,
        city: basicDetails.city,
        state: basicDetails.state,
        country: basicDetails.country,
        zipCode: basicDetails.postalCode
      }
    }
    return await Property.create(Property.collectionName, data)
  }

  static updateCoordinates = async (location: any, propertyId: string) => {
    if (propertyId) {
      // updating the property with amenity data
      const propertyInstance = new Property();
      const output = await Property.find<Record<string, any>>(Property.collectionName, propertyId)
      if (output) {
        const keyValue = "location.coordinates";
        await propertyInstance.updateDoc(propertyId, { [keyValue]: location });
      }
    }
  }

  static updateAmenities = async (amenities: any, propertyId: string) => {
    const selectedAmenities = Object.keys(amenities)
      .filter(key => amenities[key])
      .map(key => `/amenities/${key}`)

    if (propertyId) {
      // updating the property with amenity data
      const propertyInstance = new Property()
      const output = await Property.find<Record<string, any>>(Property.collectionName, propertyId)
      if (output) {
        await propertyInstance.updateDoc(propertyId, { amenities: selectedAmenities })
      }
    }
  }

  static updatePhotos = async (photos: File[], propertyId: string) => {
    const imagesUrl = []

    for (const photo of photos) {
      const res = await FilesController.uploadFile(photo, "/properties");
      if (res.status === 'success') {
        imagesUrl.push(res.imageUrl)
      }
    }
    const propertyInstance = new Property()
    const output = await Property.find<Record<string, any>>(Property.collectionName, propertyId)
    if (output) {
      await propertyInstance.updateDoc(propertyId, { photos: imagesUrl })
    }
  }

  static updateContacts = async (contact: any, propertyId: string) => {
    const propertyInstance = new Property()
    const outcome = await Property.find<Record<string, any>>(Property.collectionName, propertyId)
    if (outcome) {
      await propertyInstance.updateDoc(propertyId, { contact: contact })
    }
  }


  static updatePolicies = async (policies: any, propertyId: string) => {
    const propertyInstance = new Property()
    const output = await Property.find<Record<string, any>>(Property.collectionName, propertyId)
    if (output) {
      const cIn = policies.checkInTime
      const cOut = policies.checkOutTime
      const policyData = {
        cancellationPolicies: policies.additionalPolicies,
        checkIn: Timestamp.fromDate(cIn.toDate()),
        checkOut: Timestamp.fromDate(cOut.toDate()),
        cancellationDeadline: policies.cancellationDeadline,
        cancellationPenalty: policies.cancellationPenalty,
        minAge: policies.minAge,
        depositRequired: policies.depositRequired,
        depositAmount: policies.depositAmount,
        petsAllowed: policies.petsAllowed,
        smokingAllowed: policies.smokingAllowed,
        partyAllowed: policies.partyAllowed
      }
      await propertyInstance.updateDoc(propertyId, { policies: policyData })
    }
  }
}
