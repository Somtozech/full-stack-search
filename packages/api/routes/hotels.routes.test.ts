import { Server } from "http";
import request from "supertest";

import * as db from "../config/database";
import { createApp } from "../app";
import { setupDatabaseConnection } from "../db/testSetup";
import { AvailableCollections } from "../enums";
import { ObjectId } from "mongodb";

describe("Hotels routes", () => {
  setupDatabaseConnection();
  let server: Server;

  beforeAll(() => {
    const app = createApp();
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /api/hotels/:id", () => {
    it("when provided hotel ID exists, should return hotel details", async () => {
      const result = await db.getCollection(AvailableCollections.Hotels).insertOne({
        hotel_name: "Test Hotel",
        city: "Test City",
        country: "Test Country",
        addressline1: "123 Test Street",
      });

      const { status, body } = await request(server).get(`/api/hotels/${result.insertedId}`);

      expect(status).toEqual(200);
      expect(body.status).toEqual("success");
      expect(body.data).toMatchObject({
        _id: result.insertedId.toString(),
        hotel_name: "Test Hotel",
        city: "Test City",
        country: "Test Country",
        addressline1: "123 Test Street",
      });
    });

    it("when hotel ID does not exist, should return 404 error", async () => {
      const response = await request(server).get(`/api/hotels/${new ObjectId().toString()}`);

      expect(response.status).toBe(404);
      expect(response.body.status).toBe("error");
    });

    it("when provided hotel ID is invalid, should return 404 error", async () => {
      const invalidId = "invalidID";
      const response = await request(server).get(`/api/hotels/${invalidId}`);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
    });
  });
});
