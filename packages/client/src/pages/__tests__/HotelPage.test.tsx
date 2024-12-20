import { describe, it, expect, vi, afterEach } from "vitest";
import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";

import * as apiSlice from "../../services/apiSlice";
import { renderWithProviders } from "../../tests/test-utils";
import { HotelPage } from "../HotelPage";

describe("HotelPage Component", () => {
  const mockHotel = {
    _id: "1",
    hotel_name: "Test Hotel",
    chain_name: "Test Chain",
    addressline1: "123 Test St",
    addressline2: "Apt 4",
    city: "Test City",
    country: "Test Country",
    zipcode: "12345",
    star_rating: 4,
  };

  const mockUseFetchHotelByIdQuery = {
    data: mockHotel,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  };

  const renderComponent = () => {
    renderWithProviders(
      <Routes>
        <Route path="/hotels/:id" element={<HotelPage />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [`/hotels/${mockHotel._id}`],
        },
      }
    );
  };

  // Cleanup after tests
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const assertUseFetchHotelsByIdQueryCalls = () => {
    expect(apiSlice.useFetchHotelByIdQuery).toHaveBeenCalledWith(mockHotel._id, expect.any(Object));
  };

  it("when hotel data is loaded, should display hotel name", () => {
    vi.spyOn(apiSlice, "useFetchHotelByIdQuery").mockReturnValue(mockUseFetchHotelByIdQuery);
    renderComponent();
    expect(screen.getByRole("heading", { name: "Test Hotel" })).toBeInTheDocument();
    assertUseFetchHotelsByIdQueryCalls();
  });

  it("when loading, should display loading message", () => {
    vi.spyOn(apiSlice, "useFetchHotelByIdQuery").mockReturnValue({
      ...mockUseFetchHotelByIdQuery,
      isLoading: true,
    });
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    assertUseFetchHotelsByIdQueryCalls();
  });

  it("when error occurs, should display error message", () => {
    vi.spyOn(apiSlice, "useFetchHotelByIdQuery").mockReturnValue({
      ...mockUseFetchHotelByIdQuery,
      error: new Error("Failed to fetch hotel"),
    });
    renderComponent();

    expect(screen.getByText("Error: Failed to fetch hotel")).toBeInTheDocument();
    assertUseFetchHotelsByIdQueryCalls();
  });
});
