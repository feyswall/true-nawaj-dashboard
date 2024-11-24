import type { DocumentReference } from 'firebase/firestore';

import type { RoomType } from '@/types/modelTypes/RoomType';
import Room from '@/models/Room';

export class OwnersController {
  public create = async <T extends RoomType>(data: T): Promise<DocumentReference> => {
    const myRoom: RoomType = {
      id: data.id,
      price: data.price,
      description: data.description,
      room_number: data.room_number,
      type: data.type,
      property_id: data.property_id,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    const room = new Room();
    const output = await room.create(myRoom);

    return output;
  }
}
