import { getCodeSandboxHost } from "@codesandbox/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { City, Country, Hotel, SearchResult, SuccessResponse } from "../types";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_PREFIX = "api";
export const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}/${API_PREFIX}`
  : `http://localhost:3001/${API_PREFIX}`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    searchAll: builder.query<SearchResult, string>({
      query: (searchTerm) => `/search?q=${encodeURIComponent(searchTerm)}`,
      transformResponse: (response: SuccessResponse<SearchResult>) => response.data,
    }),

    // Fetch hotel by ID endpoint
    fetchHotelById: builder.query<Hotel, string>({
      query: (id) => `/hotels/${id}`,
      transformResponse: (response: SuccessResponse<Hotel>) => response.data,
    }),

    // Fetch city by ID endpoint
    fetchCityById: builder.query<City, string>({
      query: (id) => `/cities/${id}`,
      transformResponse: (response: SuccessResponse<City>) => response.data,
    }),

    // Fetch country by ID endpoint
    fetchCountryById: builder.query<Country, string>({
      query: (id) => `/countries/${id}`,
      transformResponse: (response: SuccessResponse<Country>) => response.data,
    }),
  }),
});

export const { useSearchAllQuery, useFetchCityByIdQuery, useFetchHotelByIdQuery, useFetchCountryByIdQuery } = apiSlice;
