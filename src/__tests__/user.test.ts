import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import { loginAdmin_wrong, registerAdmin, registerStudent } from "./payload";
import mongoose from "mongoose";

const app = createServer();

describe("User", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
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
        expect(result.body).toMatchObject({
          message: `username ${loginAdmin_wrong.username} not found.`,
        });
      });
    });

    describe("Get the registered user", () => {
      it("returns logged in as an Admin", async () => {
        await supertest(app).post("/api/admins/register").send(registerAdmin);

        const result = await supertest(app).post(`/api/auth/login`).send({
          username: registerAdmin.email,
          password: registerAdmin.password,
        });

        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({ message: `Logged in as : admin` });
        expect(result.body.user).toMatchObject({
          username: registerAdmin.email,
          type: "admin",
        });
      });

      it("returns logged in as a Student", async () => {
        await supertest(app)
          .post("/api/students/register")
          .send(registerStudent);

        const result = await supertest(app).post(`/api/auth/login`).send({
          username: registerStudent.reg_number,
          password: registerStudent.password,
        });

        expect(result.status).toBe(201);
        expect(result.body).toMatchObject({
          message: `Logged in as : student`,
        });
        expect(result.body.user).toMatchObject({
          username: registerStudent.reg_number,
          type: "student",
        });
      });
    });
  });
});
