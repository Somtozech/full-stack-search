import { ObjectId } from "mongodb";

import { City } from "../types";
import { getCollection } from "../config/database";
import { AvailableCollections } from "../enums";
import { NotFoundError } from "../utils/errors";

export const getCityById = async (id: string): Promise<City> => {
  if (!ObjectId.isValid(id)) {
    throw new NotFoundError("City not found");
  }
  const city = await getCollection<City>(AvailableCollections.Cities).findOne({ _id: new ObjectId(id) });

  if (!city) {
    throw new NotFoundError("City not found");
  }

  return city;
};

export const getAllCities = async (): Promise<City[]> => {
  return getCollection<City>(AvailableCollections.Cities).find({}).toArray();
};
