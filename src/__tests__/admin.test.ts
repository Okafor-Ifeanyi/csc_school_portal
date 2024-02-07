import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import { registerAdmin } from "./payload";
import mongoose from "mongoose";

const app = createServer();

describe("User", () => {
  jest.setTimeout(30000);

  beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // test get all admins
  describe("Get a User", () => {
    describe("by ID", () => {
      it("return 404 user not found", async () => {
        const id = "65c1080efed4dc96b697dbad";

        const result = await supertest(app).get(`/api/users/${id}`);

        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({
          message: "Could not find user",
        });
      });

      it("return 201 successful", async () => {
        // expect(true).toBe(true);
        const user_data = await supertest(app)
          .post("/api/admins/")
          .send(registerAdmin);

        const id = user_data.body.data.user_id;

        const result = await supertest(app).get(`/api/users/${id}`);

        expect(result.status).toBe(201);
        expect(result.body.data).toMatchObject({
          username: registerAdmin.email,
          type: "admin",
          createdAt: expect.any(String),
        });
      });
    });

    describe("by username", () => {
      it("return 201 successful", async () => {
        // expect(true).toBe(true);
        const user_data = await supertest(app)
          .post("/api/admins/")
          .send(registerAdmin);

        const id = user_data.body.data.email;

        const result = await supertest(app).get(`/api/users/@${id}`);

        expect(result.status).toBe(201);
        expect(result.body.data).toMatchObject({
          username: registerAdmin.email,
          type: "admin",
          createdAt: expect.any(String),
        });
      });
    });

    describe("All Users", () => {
      it("return 403 Unauthorized", async () => {
        const result = await supertest(app).get(`/api/users/`);

        expect(result.status).toBe(403);
        expect(result.body).toMatchObject({
          message: "Unauthorized! Please Login",
        });
      });

      it("return 201 successful", async () => {
        // Create Admin User
        await supertest(app)
          .post("/api/admins/")
          .send(registerAdmin);

        // loggin the created User                                                           //
        const login = await supertest(app).post(`/api/auth/login`).send({
          username: registerAdmin.email,
          password: registerAdmin.password,
        });

        const cookies = login.headers["set-cookie"];
        const result = await supertest(app)
          .get(`/api/users/`)
          .set("Cookie", cookies);

        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
          success: true,
        });
      });
    });
  });
});

// Given the user is logged in
// test get single admin
// test updateing an admin
// Given the user is logged in
// given the schema is wrong and write
// test delete an admin
// test auth on isHod
