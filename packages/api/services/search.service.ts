import { SearchResults } from "types";

import * as db from "../config/database";
import { AvailableCollections } from "../enums";

export const search = async (query: string): Promise<SearchResults> => {
  const results = await db
    .getCollection(AvailableCollections.Hotels)
    .aggregate([
      {
        $match: {
          $or: [
            { hotel_name: createRegexFilter(query) },
            { city: createRegexFilter(query) },
            { country: createRegexFilter(query) },
          ],
        },
      },
      { $project: { _id: 1, hotel_name: 1, city: 1, country: 1 } },
      { $addFields: { type: "hotels" } },
      // Add countries results
      {
        $unionWith: {
          coll: "countries",
          pipeline: [
            { $match: { country: createRegexFilter(query) } },
            { $project: { _id: 1, country: 1 } },
            { $addFields: { type: "countries" } },
          ],
        },
      },
      // Add cities results
      {
        $unionWith: {
          coll: "cities",
          pipeline: [
            { $match: { name: createRegexFilter(query) } },
            { $project: { _id: 1, name: 1 } },
            { $addFields: { type: "cities" } },
          ],
        },
      },
    ])
    .toArray();

  return results.reduce(
    (acc, item) => {
      const { type, ...rest } = item;
      acc[type].push(rest);
      return acc;
    },
    { hotels: [], cities: [], countries: [] }
  ) as SearchResults;
};

const createRegexFilter = (query: string) => {
  return { $regex: query, $options: "i" };
};
