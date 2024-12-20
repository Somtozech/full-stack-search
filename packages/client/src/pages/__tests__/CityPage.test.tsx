import { describe, it, expect, vi, afterEach } from "vitest";
import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";

import { CityPage } from "../CityPage";
import * as apiSlice from "../../services/apiSlice";
import { renderWithProviders } from "../../tests/test-utils";
// Mock the RTK Query hook

vi.mock("../services/apiSlice", () => ({
  useFetchCityByIdQuery: vi.fn(),
}));

describe("CityPage Component", () => {
  const mockCity = {
    _id: "1",
    name: "Test City",
    country: "Test Country",
  };

  const renderComponent = () => {
    renderWithProviders(
      <Routes>
        <Route path="/cities/:id" element={<CityPage />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [`/cities/${mockCity._id}`],
        },
      }
    );
  };

  const mockUseFetchCityByIdQuery = {
    data: mockCity,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  };

  // Cleanup after tests
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("when city data is loaded, should display city name", () => {
    vi.spyOn(apiSlice, "useFetchCityByIdQuery").mockReturnValue(mockUseFetchCityByIdQuery);
    renderComponent();
    expect(screen.getByRole("heading", { name: "Test City" })).toBeInTheDocument();
  });

  it("when loading, should display loading message", () => {
    vi.spyOn(apiSlice, "useFetchCityByIdQuery").mockReturnValue({
      ...mockUseFetchCityByIdQuery,
      isLoading: true,
    });
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("when error occurs, should display error message", () => {
    vi.spyOn(apiSlice, "useFetchCityByIdQuery").mockReturnValue({
      ...mockUseFetchCityByIdQuery,
      error: new Error("Failed to fetch city"),
    });
    renderComponent();
    expect(screen.getByText("Error: Failed to fetch city")).toBeInTheDocument();
  });
});
