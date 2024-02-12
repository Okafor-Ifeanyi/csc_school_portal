import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import { loginAdmin_wrong, registerAdmin } from "./payload";
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

  describe("Login", () => {
    describe("Validation Error on Schema", () => {
      it("drops db", async () => {
        await mongoose.connection.dropDatabase();
      });

      it("returns 422 entity error", async () => {
        // expect(true).toBe(true);
        const result = await supertest(app).post(`/api/auth/login`).send();

        expect(result.status).toBe(422);
      });
    });

    describe("Get the user doesnt exist", () => {
      it("return 401", async () => {
        // expect(true).toBe(true);
        const result = await supertest(app)
          .post(`/api/auth/login`)
          .send(loginAdmin_wrong);

        expect(result.status).toBe(401);
        expect(result.body).toMatchObject({
          message: `username ${loginAdmin_wrong.username} not found.`,
        });
      });
    });

    describe("Get the registered user", () => {
      it("returns logged in as an Admin", async () => {
        await supertest(app).post("/api/admins/").send(registerAdmin);
        // Test Wrong password Auth
        const wrong_password = await supertest(app)
          .post(`/api/auth/login`)
          .send({
            username: registerAdmin.email,
            password: registerAdmin.email,
          });

        expect(wrong_password.status).toBe(401);
        expect(wrong_password.body).toMatchObject({
          message: `Invalid email or password.`,
        });

        const result = await supertest(app).post(`/api/auth/login`).send({
          username: registerAdmin.email,
          password: registerAdmin.password,
        });

        // logout
        await supertest(app).get(`/api/auth/logout`);

        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({ message: `Logged in as : admin` });
        expect(result.body.user).toMatchObject({
          username: registerAdmin.email,
          type: "admin",
        });
      });
    });
  });

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
        await supertest(app).post("/api/admins/").send(registerAdmin);

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
