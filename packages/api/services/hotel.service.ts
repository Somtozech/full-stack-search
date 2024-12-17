import { ObjectId } from "mongodb";

import { Hotel } from "../types";
import { getCollection } from "../config/database";
import { AvailableCollections } from "../enums";
import { NotFoundError } from "../utils/errors";

export const getHotelById = async (id: string): Promise<Hotel> => {
  if (!ObjectId.isValid(id)) {
    throw new NotFoundError("Invalid hotel ID");
  }

  const hotel = await getCollection<Hotel>(AvailableCollections.Hotels).findOne({ _id: new ObjectId(id) });

  if (!hotel) {
    throw new NotFoundError("Hotel not found");
  }

  return hotel;
};
