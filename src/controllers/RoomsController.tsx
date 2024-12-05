import { Timestamp, type DocumentReference } from 'firebase/firestore';

import type { RoomType } from '@/types/modelTypes/RoomType';
import Room from '@/models/Room';

export class RoomsController {
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


  static registerRooms = async (rooms: Record<string, any>[], propertyId: string) => {
    // Start by registering the rooms one by one
    for (const room of rooms) {
      const roomRegisteringData = {
        photos: [],
        property_id: propertyId,
        room_number: room.roomNumber,
        type: room.roomType,
        basePrice: room.basePrice,
        hightPrice: room.seasonalPrices.highSeason,
        lowPrice: room.seasonalPrices.lowSeason,
        occupancy: room.occupancy,
        description: room.description,
        created_at: Timestamp.now(),
        updated_at: null,
      };
      // Ensure this operation completes before moving to the next room
      await Room.create(Room.collectionName, roomRegisteringData);
    }
    // const roomRegisteringData = {
    //   photos: [],
    //   property_id: propertyId,
    //   room_number: room.roomNumber,
    //   type: room.roomType,
    //   basePrice: room.basePrice,
    //   hightPrice: room.seasonalPrices.highSeason,
    //   lowPrice: room.seasonalPrices.lowSeason,
    //   occupancy: room.occupancy,
    //   description: room.description,
    //   created_at: Timestamp.now(),
    //   updated_at: null
    // }
    // await Room.create(Room.collectionName, roomRegisteringData)


  };


}
