import { Server } from "http";
import request from "supertest";

import * as db from "../config/database";
import { createApp } from "../app";
import { setupDatabaseConnection } from "../db/testSetup";
import { AvailableCollections } from "../enums";
import { ObjectId } from "mongodb";

describe("City routes", () => {
  setupDatabaseConnection();
  let server: Server;

  beforeAll(() => {
    const app = createApp();
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /api/cities/:id", () => {
    it("when provided city ID exists, should return city details", async () => {
      const result = await db.getCollection(AvailableCollections.Cities).insertOne({
        name: "Test City",
      });
      const { status, body } = await request(server).get(`/api/cities/${result.insertedId}`);

      expect(status).toEqual(200);
      expect(body.status).toEqual("success");
      expect(body.data).toMatchObject({
        _id: result.insertedId.toString(),
        name: "Test City",
      });
    });
  });

  it("when city ID does not exist, should return 404 error", async () => {
    const response = await request(server).get(`/api/cities/${new ObjectId().toString()}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
  });

  it("when provided city ID is invalid, should return 400 error", async () => {
    const invalidId = "invalidID";
    const response = await request(server).get(`/api/cities/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
  });
});
