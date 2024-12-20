import { screen } from "@testing-library/react";
import { CountryPage } from "../CountryPage";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Routes, Route } from "react-router-dom";

import { renderWithProviders } from "../../tests/test-utils";

import * as apiSlice from "../../services/apiSlice";

describe("CountryPage Component", () => {
  const mockCountry = {
    _id: "1",
    country: "Test Country",
    countryisocode: "TC",
  };

  const mockUseFetchCountryByIdQuery = {
    data: mockCountry,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  };

  const renderComponent = () => {
    renderWithProviders(
      <Routes>
        <Route path="/countries/:id" element={<CountryPage />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [`/countries/${mockCountry._id}`],
        },
      }
    );
  };

  // Cleanup after tests
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("when country data is loaded, should display country name", () => {
    vi.spyOn(apiSlice, "useFetchCountryByIdQuery").mockReturnValue(mockUseFetchCountryByIdQuery);
    renderComponent();
    expect(screen.getByRole("heading", { name: "Test Country" })).toBeInTheDocument();
  });

  it("when loading, should display loading message", () => {
    vi.spyOn(apiSlice, "useFetchCountryByIdQuery").mockReturnValue({
      ...mockUseFetchCountryByIdQuery,
      isLoading: true,
    });
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("when error occurs, should display error message", () => {
    vi.spyOn(apiSlice, "useFetchCountryByIdQuery").mockReturnValue({
      ...mockUseFetchCountryByIdQuery,
      error: new Error("Failed to fetch country"),
    });
    renderComponent();
    expect(screen.getByText("Error: Failed to fetch country")).toBeInTheDocument();
  });
});
