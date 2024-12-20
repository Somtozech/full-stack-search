// src/routes/__tests__/countries.test.ts
import { Server } from "http";
import request from "supertest";
import * as db from "../config/database";

import { createApp } from "../app";
import { setupDatabaseConnection } from "../db/testSetup";
import { AvailableCollections } from "../enums";
import { ObjectId } from "mongodb";

describe("Countries routes", () => {
  setupDatabaseConnection();
  let server: Server;

  beforeAll(() => {
    const app = createApp();
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /api/countries/:id", () => {
    it("when provided country ID exists, should return country details", async () => {
      const result = await db.getCollection(AvailableCollections.Countries).insertOne({
        country: "Test Country",
        countryisocode: "TC",
      });

      const { status, body } = await request(server).get(`/api/countries/${result.insertedId}`);

      expect(status).toEqual(200);
      expect(body.status).toEqual("success");
      expect(body.data).toMatchObject({
        _id: result.insertedId.toString(),
        country: "Test Country",
        countryisocode: "TC",
      });
    });

    it("when country ID does not exist, should return 404 error", async () => {
      const response = await request(server).get(`/api/countries/${new ObjectId().toString()}`);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe("error");
    });

    it("when provided country ID is invalid, should return 400 error", async () => {
      const invalidId = "invalidID";
      const response = await request(server).get(`/api/countries/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });
});
