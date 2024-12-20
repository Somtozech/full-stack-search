import { useParams } from "react-router-dom";
import { useFetchCityByIdQuery } from "../services/apiSlice";
import { getErrorMessage } from "../utils/error";

export const CityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: city,
    isLoading,
    error,
  } = useFetchCityByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {getErrorMessage(error)}</div>;
  if (!city) return <div className="text-center mt-5">No city found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">{city.name}</h1>
        </div>
      </div>
    </div>
  );
};
