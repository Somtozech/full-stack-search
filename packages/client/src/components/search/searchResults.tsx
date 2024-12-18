import React from "react";
import { useNavigate } from "react-router-dom";
import { Hotel, City, Country } from "../../types";

interface SearchResultsProps {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ hotels, cities, countries }) => {
  const navigate = useNavigate();

  const handleResultClick = (type: "hotel" | "city" | "country", item: Hotel | City | Country) => {
    switch (type) {
      case "hotel":
        navigate(`/hotels/${(item as Hotel)._id}`);
        break;
      case "city":
        navigate(`/cities/${(item as City)._id}`);
        break;
      case "country":
        navigate(`/countries/${(item as Country)._id}`);
        break;
    }
  };

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      {hotels.length > 0 && (
        <>
          <h2>Hotels</h2>
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="dropdown-item cursor-pointer"
              onClick={() => handleResultClick("hotel", hotel)}
            >
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name} - {hotel.city}, {hotel.country}
              <hr className="divider" />
            </div>
          ))}
        </>
      )}

      {countries.length > 0 && (
        <>
          <h2>Countries</h2>
          {countries.map((country) => (
            <div
              key={country._id}
              className="dropdown-item cursor-pointer"
              onClick={() => handleResultClick("country", country)}
            >
              <i className="fa fa-globe mr-2"></i>
              {country.country}
              <hr className="divider" />
            </div>
          ))}
        </>
      )}

      {cities.length > 0 && (
        <>
          <h2>Cities</h2>
          {cities.map((city) => (
            <div
              key={city._id}
              className="dropdown-item cursor-pointer"
              onClick={() => handleResultClick("city", city)}
            >
              <i className="fa fa-building mr-2"></i>
              {city.name}
              <hr className="divider" />
            </div>
          ))}
        </>
      )}

      {hotels.length === 0 && countries.length === 0 && cities.length === 0 && <p>No results found</p>}
    </div>
  );
};
