import { useState } from "react";
import { useDebounce } from "./useDebounce";
import { useSearchAllQuery } from "../services/apiSlice";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: searchResults,
    isSuccess,
    isFetching,
    error,
  } = useSearchAllQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm,
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults: {
      hotels: searchResults?.hotels || [],
      cities: searchResults?.cities || [],
      countries: searchResults?.countries || [],
    },
    isLoading: isFetching,
    isSuccess,
    error: error as string | undefined,
    clearSearch,
  };
};
