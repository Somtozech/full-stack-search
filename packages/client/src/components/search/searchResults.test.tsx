import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { SearchResults } from "./searchResults";
import { renderWithProviders } from "../../tests/test-utils";

describe("SearchResults Component", () => {
  const mockResults = {
    hotels: [
      {
        _id: "1",
        hotel_name: "Test Hotel",
        city: "London",
        country: "UK",
      },
    ],
    cities: [
      {
        _id: "1",
        name: "London",
      },
    ],
    countries: [
      {
        _id: "1",
        country: "United Kingdom",
      },
    ],
  };

  const renderComponent = (props = mockResults) => {
    return renderWithProviders(<SearchResults {...props} />, {
      routerProps: {
        initialEntries: ["/"],
      },
    });
  };

  it("when hotels exist, should render hotels section", () => {
    renderComponent();

    const hotelsHeading = screen.getByRole("heading", { name: /hotels/i });
    expect(hotelsHeading).toBeInTheDocument();

    const hotelLink = screen.getByTestId("hotel-link-1");
    expect(hotelLink).toBeInTheDocument();
  });

  it("when cities exist, should render cities section", () => {
    renderComponent();

    const citiesHeading = screen.getByRole("heading", { name: /cities/i });
    expect(citiesHeading).toBeInTheDocument();

    const cityLink = screen.getByTestId("city-link-1");
    expect(cityLink).toBeInTheDocument();
  });

  it("when countries exist, should render countries section", () => {
    renderComponent();

    const countriesHeading = screen.getByRole("heading", { name: /countries/i });
    expect(countriesHeading).toBeInTheDocument();

    const countryLink = screen.getByTestId("country-link-1");
    expect(countryLink).toBeInTheDocument();
  });

  it("when hotels exist, should have correct link for hotel", () => {
    renderComponent();

    const hotelLink = screen.getByTestId("hotel-link-1");
    expect(hotelLink).toHaveAttribute("href", "/hotels/1");
  });

  it("when cities exist, should have correct link for city", () => {
    renderComponent();

    const cityLink = screen.getByTestId("city-link-1");
    expect(cityLink).toHaveAttribute("href", "/cities/1");
  });

  it("when countries exist, should have correct link for country", () => {
    renderComponent();

    const countryLink = screen.getByTestId("country-link-1");
    expect(countryLink).toHaveAttribute("href", "/countries/1");
  });
});
