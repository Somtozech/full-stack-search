export interface Hotel {
  _id: string;
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

export interface City {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  country: string;
  countryisocode: string;
}

export interface SearchResults {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
