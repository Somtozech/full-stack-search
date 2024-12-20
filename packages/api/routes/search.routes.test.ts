import { Server } from "http";
import request from "supertest";
import * as db from "../config/database";

import { createApp } from "../app";
import { setupDatabaseConnection } from "../db/testSetup";
import { AvailableCollections } from "../enums";

describe("Search routes", () => {
  setupDatabaseConnection();
  let server: Server;

  beforeAll(async () => {
    const app = createApp();
    server = app.listen();
  });

  beforeEach(async () => {
    // Seed test data
    const hotelsCollection = db.getCollection(AvailableCollections.Hotels);
    const citiesCollection = db.getCollection(AvailableCollections.Cities);
    const countriesCollection = db.getCollection(AvailableCollections.Countries);

    await hotelsCollection.insertMany([
      { hotel_name: "London Luxury Hotel", city: "London", country: "United Kingdom" },
      { hotel_name: "Paris Grand Hotel", city: "Paris", country: "France" },
    ]);

    await citiesCollection.insertMany([{ name: "London" }, { name: "Paris" }]);

    await countriesCollection.insertMany([
      { country: "United Kingdom", countryisocode: "UK" },
      { country: "France", countryisocode: "FR" },
    ]);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /api/search", () => {
    it("when searching with valid query, should return matching hotels, cities, and countries", async () => {
      const { status, body } = await request(server).get("/api/search").query({ q: "London" });

      expect(status).toBe(200);
      expect(body.status).toBe("success");

      // Verify hotels
      expect(body.data.hotels).toHaveLength(1);
      expect(body.data.hotels[0].hotel_name).toBe("London Luxury Hotel");

      // Verify cities
      expect(body.data.cities).toHaveLength(1);
      expect(body.data.cities[0].name).toBe("London");

      // Verify countries
      expect(body.data.countries).toHaveLength(0);
    });

    it("should return matching hotels, cities, and countries for case-insensitive queries", async () => {
      const { status, body } = await request(server).get("/api/search").query({ q: "uni" });

      expect(status).toBe(200);
      expect(body.status).toBe("success");

      // Verify hotels
      expect(body.data.hotels).toHaveLength(1);
      expect(body.data.hotels[0].hotel_name).toBe("London Luxury Hotel");

      // Verify cities
      expect(body.data.cities).toHaveLength(0);

      // Verify countries
      expect(body.data.countries).toHaveLength(1);
      expect(body.data.countries[0].country).toEqual("United Kingdom");
    });

    it("when no search query is provided, should return 400 error", async () => {
      const response = await request(server).get("/api/search");

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });

    it("when search query returns no results, should return empty data", async () => {
      const { status, body } = await request(server).get("/api/search").query({ q: "NonExistentSearch" });

      expect(status).toEqual(200);
      expect(body.status).toEqual("success");
      expect(body.data.hotels).toHaveLength(0);
      expect(body.data.cities).toHaveLength(0);
      expect(body.data.countries).toHaveLength(0);
    });
  });
});
