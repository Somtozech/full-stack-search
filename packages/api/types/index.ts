import { Document, ObjectId } from "mongodb";

export interface Hotel extends Document {
  _id: ObjectId;
  chain_name: string;
  hotel_name: string;
  addressline1: string;
  addressline2?: string;
  zipcode: string;
  city: string;
  state?: string;
  country: string;
  countryisocode: string;
  star_rating: number;
}

export interface City extends Document {
  _id: ObjectId;
  name: string;
}

export interface Country extends Document {
  _id: ObjectId;
  country: string;
  countryisocode: string;
}

export interface SearchResults {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
