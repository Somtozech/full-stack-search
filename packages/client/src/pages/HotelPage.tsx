import React from "react";
import { useParams } from "react-router-dom";
import { useFetchHotelByIdQuery } from "../services/apiSlice";
import { getErrorMessage } from "../utils/error";

export const HotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: hotel,
    isLoading,
    error,
  } = useFetchHotelByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {getErrorMessage(error)}</div>;
  if (!hotel) return <div className="text-center mt-5">No hotel found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">{hotel.hotel_name}</h1>
          <h2 className="mb-4">{hotel.chain_name}</h2>

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <i className="fa fa-map-marker mr-1"></i>
            <span>
              {hotel.addressline1}
              {hotel.addressline2 && `, ${hotel.addressline2}`}
            </span>
          </div>

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <i className="fa fa-globe mr-1"></i>
            <span>
              {hotel.city}, {hotel.country} {hotel.zipcode && `- ${hotel.zipcode}`}
            </span>
          </div>

          {hotel.star_rating && (
            <div className="d-flex justify-content-center align-items-center">
              <i className="fa fa-star mr-1"></i>
              <span>{hotel.star_rating} Star Hotel</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
