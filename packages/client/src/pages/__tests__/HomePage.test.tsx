import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { HomePage } from "../HomePage";
import { renderWithProviders } from "../../tests/test-utils";
import * as apiSlice from "../../services/apiSlice";
import { Routes, Route } from "react-router-dom";

describe("HomePage Component", () => {
  const mockSearchResults = {
    hotels: [],
    cities: [],
    countries: [],
  };

  const mockUseSearchAllQuery = {
    data: mockSearchResults,
    isLoading: false,
    isSuccess: true,
    error: null,
    refetch: vi.fn(),
  };

  const renderComponent = () => {
    return renderWithProviders(
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>,
      {
        routerProps: {
          initialEntries: [`/`],
        },
      }
    );
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("when rendering, should display search input", () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search accommodation...");
    expect(searchInput).toBeInTheDocument();
  });

  it("when typing in search input, should update input value", () => {
    vi.spyOn(apiSlice, "useSearchAllQuery").mockReturnValue(mockUseSearchAllQuery);
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search accommodation...");
    fireEvent.change(searchInput, { target: { value: "london" } });

    expect(searchInput).toHaveValue("london");
  });

  it("when clear button is clicked, should clear input value", () => {
    renderWithProviders(<HomePage />);

    const searchInput = screen.getByPlaceholderText("Search accommodation...");
    fireEvent.change(searchInput, { target: { value: "london" } });

    const clearButton = screen.getByTestId("search-clear-button");
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
  });

  it("when search results exist, should render SearchResults", () => {
    vi.spyOn(apiSlice, "useSearchAllQuery").mockReturnValue({
      ...mockUseSearchAllQuery,
      data: {
        hotels: [
          {
            _id: "1",
            hotel_name: "Test Hotel",
            city: "Test City",
            country: "Test Country",
          },
        ],
        cities: [],
        countries: [],
      },
    });
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Search accommodation...");
    fireEvent.change(searchInput, { target: { value: "london" } });

    expect(screen.getByTestId("search-results")).toBeInTheDocument();
  });

  it("when an error occurs, should display error message", () => {
    vi.spyOn(apiSlice, "useSearchAllQuery").mockReturnValue({
      ...mockUseSearchAllQuery,
      error: "Test error message",
    });

    renderComponent();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
