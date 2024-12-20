import { ObjectId } from "mongodb";
import { Country } from "../types";
import { getCollection } from "../config/database";
import { AvailableCollections } from "../enums";
import { NotFoundError } from "../utils/errors";

export const getCountryById = async (id: string): Promise<Country> => {
  if (!ObjectId.isValid(id)) {
    throw new NotFoundError("Country not found");
  }

  const country = await getCollection<Country>(AvailableCollections.Countries).findOne({ _id: new ObjectId(id) });

  if (!country) {
    throw new NotFoundError("Country not found");
  }

  return country;
};
