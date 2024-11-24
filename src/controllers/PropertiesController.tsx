import type { DocumentReference } from 'firebase/firestore';

import Property from '@/models/Property';

import type { PropertyType } from '@/types/modelTypes/PropertyType'

export class PropertiesController {
  
  public create = async <T extends PropertyType>(data: T): Promise<DocumentReference> => {
    const myDatas = {
      address: data.address,
      created_at: `${data.created_at}`,
      description: data.description,
      name: data.name,
      type: data.type,
      updated_at: data.updated_at
    };

    const property = new Property();

    const output = await property.create(myDatas);

    return output;
  }
}
