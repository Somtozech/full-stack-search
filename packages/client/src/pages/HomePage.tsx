import { useSearch } from "../hooks/useSearch";
import { SearchResults } from "../components/search/searchResults";
import { getErrorMessage } from "../utils/error";

export const HomePage: React.FC = () => {
  const { searchTerm, setSearchTerm, searchResults, isLoading, isSuccess, error, clearSearch } = useSearch();

  const hasResults =
    searchResults.hotels.length > 0 || searchResults.cities.length > 0 || searchResults.countries.length > 0;

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="dropdown">
            <div className="form">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control form-input ps-5"
                placeholder="Search accommodation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {searchTerm && (
                <span data-testid="search-clear-button" className="left-pan cursor-pointer" onClick={clearSearch}>
                  <i className="fa fa-close text-muted"></i>
                </span>
              )}
            </div>

            {error && (
              <div className="dropdown-menu w-100 show p-2 text-center">
                <div className="alert alert-danger mb-0" role="alert">
                  {getErrorMessage(error)}
                </div>
              </div>
            )}

            {isSuccess && searchTerm && (
              <>
                {hasResults ? (
                  <SearchResults
                    hotels={searchResults.hotels}
                    cities={searchResults.cities}
                    countries={searchResults.countries}
                  />
                ) : (
                  !isLoading && (
                    <div className="dropdown-menu w-100 show p-2 text-center">
                      <p className="mb-0">No results found</p>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
