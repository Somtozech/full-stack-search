import React from "react";
import { Link } from "react-router-dom";
import { Hotel, City, Country } from "../../types";

interface SearchResultsProps {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ hotels, cities, countries }) => {
  return (
    <div data-testid="search-results" className="search-dropdown-menu dropdown-menu w-100 show p-2">
      {hotels.length > 0 && (
        <>
          <h2>Hotels</h2>
          {hotels.map((hotel) => (
            <Link
              to={`/hotels/${hotel._id}`}
              key={hotel._id}
              className="dropdown-item cursor-pointer"
              data-testid={`hotel-link-${hotel._id}`}
            >
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name} - {hotel.city}, {hotel.country}
              <hr className="divider" />
            </Link>
          ))}
        </>
      )}

      {countries.length > 0 && (
        <>
          <h2>Countries</h2>
          {countries.map((country) => (
            <Link
              key={country._id}
              to={`/countries/${country._id}`}
              className="dropdown-item cursor-pointer"
              data-testid={`country-link-${country._id}`}
            >
              <i className="fa fa-globe mr-2"></i>
              {country.country}
              <hr className="divider" />
            </Link>
          ))}
        </>
      )}

      {cities.length > 0 && (
        <>
          <h2>Cities</h2>
          {cities.map((city) => (
            <Link
              key={city._id}
              to={`/cities/${city._id}`}
              className="dropdown-item cursor-pointer"
              data-testid={`city-link-${city._id}`}
            >
              <i className="fa fa-building mr-2"></i>
              {city.name}
              <hr className="divider" />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
