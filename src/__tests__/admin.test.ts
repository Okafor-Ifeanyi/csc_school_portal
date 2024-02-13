import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import {
  registerAdmin,
  registerAdminAdvisor,
  updateAdmin201,
  updateAdmin422,
} from "./payload";
import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";

const app = createServer();
let cookie: any = "";
let data: Partial<UserDocument> = {};

describe("Admin", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create Admin User
    await supertest(app).post("/api/admins/").send(registerAdminAdvisor);

    // Logout any existing session
    await supertest(app).get(`/api/auth/logout`);

    // loggin the created User
    const login = await supertest(app).post(`/api/auth/login`).send({
      username: registerAdminAdvisor.email,
      password: registerAdminAdvisor.password,
    });

    cookie = login.headers["set-cookie"];
    data = login.body.user;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // test get all admins
  describe("Get an Admin", () => {
    describe("by ID", () => {
      it("return 404 user not found", async () => {
        const id = "65c1080efed4dc964597dbad";

        const result = await supertest(app).get(`/api/admins/${id}`);
        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({
          message: "Could not find admin",
        });
      });

      it("return 201 successful", async () => {
        const result = await supertest(app).get(`/api/admins/${data._id}`);
        // .set("Cookie", cookie);

        // console.log(result.body)
        expect(result.status).toBe(201);
        expect(result.body.data).toMatchObject({
          email: registerAdminAdvisor.email,
          createdAt: expect.any(String),
        });
      });
    });

    describe("by username", () => {
      it("return 201 successful", async () => {
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

    describe("Get All Admin", () => {
      it("return 403 Unauthorized", async () => {
        const result = await supertest(app).get(`/api/admins/`);

        expect(result.status).toBe(403);
        expect(result.body).toMatchObject({
          message: "Unauthorized! Please Login",
        });
      });

      it("return 200 successful", async () => {
        const result = await supertest(app)
          .get(`/api/admins/`)
          .set("Cookie", cookie);

        expect(result.status).toBe(200);
        expect(result.body).toMatchObject({
          success: true,
        });
      });
    });

    describe("Update an Admin", () => {
      it("return 403 Unauthorized", async () => {
        const result = await supertest(app).patch(`/api/admins/`);

        expect(result.status).toBe(403);
        expect(result.body).toMatchObject({
          message: "Unauthorized! Please Login",
        });
      });

      it("return 422 schema check", async () => {
        const result = await supertest(app)
          .patch(`/api/admins/`)
          .set("Cookie", cookie)
          .send(updateAdmin422);

        expect(result.status).toBe(422);
      });

      it("return 201 successful", async () => {
        const result = await supertest(app)
          .patch(`/api/admins/`)
          .set("Cookie", cookie)
          .send(updateAdmin201);

        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({
          success: true,
          message: "Admin successfully updated",
        });
        expect(result.body.data).toMatchObject({
          full_name: updateAdmin201.full_name,
        });
      });
    });

    describe("Delete an Admin", () => {
      it("return 403 Unauthorized", async () => {
        const result = await supertest(app).delete(`/api/admins/`);

        expect(result.status).toBe(403);
        expect(result.body).toMatchObject({
          message: "Unauthorized! Please Login",
        });
      });

      it("return 201 successful", async () => {
        const result = await supertest(app)
          .delete(`/api/admins/`)
          .set("Cookie", cookie);

        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({
          success: true,
          message: "Admin has been deleted",
        });
      });
    });
  });
});
