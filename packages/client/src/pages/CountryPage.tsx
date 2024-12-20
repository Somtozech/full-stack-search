import { useParams } from "react-router-dom";
import { useFetchCountryByIdQuery } from "../services/apiSlice";
import { getErrorMessage } from "../utils/error";

export const CountryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: country,
    isLoading,
    error,
  } = useFetchCountryByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {getErrorMessage(error)}</div>;
  if (!country) return <div className="text-center mt-5">No country found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-8 text-center">
          <img
            src={`https://flagcdn.com/w640/${country.countryisocode.toLowerCase()}.png`}
            alt={`Flag of ${country.country}`}
            className="mb-4"
            style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "contain" }}
          />

          <h1 className="mb-4">{country.country}</h1>

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <i className="fa fa-globe mr-1"></i>
            <span>{country.countryisocode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
