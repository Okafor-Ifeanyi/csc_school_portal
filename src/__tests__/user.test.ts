import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import { loginAdmin_wrong } from "./payload";
import mongoose from "mongoose";

const app = createServer();

describe("User", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    console.log(mongoServer.getUri());
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Login", () => {
    describe("Validation Error on Schema", () => {
      it("returns 422 entity error", async () => {
        // expect(true).toBe(true);
        const result = await supertest(app).post(`/api/auth/login`).send();

        expect(result.status).toBe(422);
      });
    });

    describe("Get the user doesnt exist", () => {
      it("return 404", async () => {
        // expect(true).toBe(true);
        const result = await supertest(app)
          .post(`/api/auth/login`)
          .send(loginAdmin_wrong);

        expect(result.status).toBe(401);
        // expect(result.body).toMatchObject({ message: "Could not find admin" });
      });
    });

    // describe("Get the registered user", () => {
    // })
  });
});
