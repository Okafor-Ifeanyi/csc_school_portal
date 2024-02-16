import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import {
  id,
  updateClass,
  createClass,
  createClass201,
  createClass422,
  registerAdminAdvisor,
} from "./payload";
import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";
import { ClassDocument } from "../models/class.model";

const app = createServer();
let cookie: any = "";
let data: Partial<UserDocument> = {};
let class_data: Partial<ClassDocument> = {};

describe("Class", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongoServer.getUri();
    await mongoose.connect(mongoServer.getUri());

    // Create class User
    await supertest(app).post("/api/admins/").send(registerAdminAdvisor);

    // Logout any existing session
    await supertest(app).get(`/api/auth/logout`);

    // loggin the created User
    const login = await supertest(app).post(`/api/auth/login`).send({
      username: registerAdminAdvisor.email,
      password: registerAdminAdvisor.password,
    });
    expect(login.status).toBe(201);

    cookie = login.headers["set-cookie"];
    data = login.body.user;

    // create a class
    const class_info = await supertest(app)
      .post("/api/classes/")
      .set("Cookie", cookie)
      .send({ ...createClass, advisor_id: data._id });

    expect(class_info.status).toBe(201);

    class_data = class_info.body.data;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // create class
  // given the user isn't logged in
  // given the schema is wrong
  // given the advisor ID is invalid
  // given the user is logged in and schema is validated return 201
  // given class name already exist
  describe("Create a Class", () => {
    it("return 403 user unauthorized", async () => {
      const result = await supertest(app)
        .post("/api/classes/")
        .send({ ...createClass, advisor_id: data._id });

      expect(result.status).toBe(403);
      expect(result.body).toMatchObject({
        message: "Unauthorized! Please Login",
      });
    });
    it("return 422 schema error", async () => {
      const result = await supertest(app)
        .post("/api/classes/")
        .set("Cookie", cookie)
        .send({ ...createClass422, advisor_id: data._id });

      expect(result.status).toBe(422);
    });
    it("return 403 advisor_id invalid", async () => {
      const result = await supertest(app)
        .post("/api/classes/")
        .set("Cookie", cookie)
        .send({ ...createClass201, advisor_id: id });

      expect(result.status).toBe(403);
      expect(result.body.message).toBe("Provided Advisor ID is not an Advisor");
    });
    it("return 201 successful", async () => {
      const result = await supertest(app)
        .post("/api/classes/")
        .set("Cookie", cookie)
        .send({ ...createClass201, advisor_id: data._id });

      expect(result.status).toBe(201);
      expect(result.body.data).toMatchObject({
        enrollement_year: createClass201.enrollement_year,
        advisor_id: data._id,
        createdAt: expect.any(String),
      });
    });
    it("return 400 name already exists", async () => {
      const result = await supertest(app)
        .post("/api/classes/")
        .set("Cookie", cookie)
        .send({ ...createClass201, advisor_id: data._id });

      expect(result.status).toBe(400);
      expect(result.body).toMatchObject({
        message: `Class with name ${createClass201.name} already exists`,
        success: false,
      });
    });
  });

  // test get single class
  // given the :id is valid return 201
  // given data isnt found return 404
  describe("Get a Class", () => {
    describe("by ID", () => {
      it("return 404 user not found", async () => {
        const id = "65c1080efed4dc964597dbad";

        const result = await supertest(app).get(`/api/classes/${id}`);
        expect(result.status).toBe(404);
        expect(result.body).toMatchObject({
          message: "Could not find class",
        });
      });

      it("return 201 successful", async () => {
        const result = await supertest(app).get(
          `/api/classes/${class_data._id}`,
        );
        // .set("Cookie", cookie);

        expect(result.status).toBe(200);
        expect(result.body.data).toMatchObject({
          enrollement_year: createClass.enrollement_year,
          advisor_id: data._id,
          createdAt: expect.any(String),
        });
      });
    });
  });

  // test get all classes
  // Given the user is logged in
  // Given the params are in place return
  // Successful
  describe("Get All class", () => {
    it("return 403 Unauthorized", async () => {
      const result = await supertest(app).get(`/api/classes/`);

      expect(result.status).toBe(403);
      expect(result.body).toMatchObject({
        message: "Unauthorized! Please Login",
      });
    });

    it("return 200 successful", async () => {
      const result = await supertest(app)
        .get(`/api/classes/`)
        .set("Cookie", cookie);

      expect(result.status).toBe(200);
      expect(result.body).toMatchObject({
        success: true,
      });
    });
  });

  // test updating a class
  // Given the user is logged in Correct Schema / ValidID => return 201
  // Given wrong ID return 404 class not found
  describe("Update an class", () => {
    it("return 403 Unauthorized", async () => {
      const result = await supertest(app).patch(
        `/api/classes/${class_data._id}`,
      );

      expect(result.status).toBe(403);
      expect(result.body).toMatchObject({
        message: "Unauthorized! Please Login",
      });
    });

    it("return 201 successful", async () => {
      const result = await supertest(app)
        .patch(`/api/classes/${class_data._id}`)
        .set("Cookie", cookie)
        .send(updateClass);

      expect(result.status).toBe(201);
      expect(result.body).toMatchObject({
        success: true,
        message: "Class successfully updated",
      });
      expect(result.body.data).toMatchObject({
        department: updateClass.department,
      });
    });

    it("return 404 class not found", async () => {
      const result = await supertest(app)
        .patch(`/api/classes/${id}`)
        .set("Cookie", cookie)
        .send(updateClass);

      expect(result.status).toBe(404);
      expect(result.body).toMatchObject({
        success: false,
        message: "Class not found",
      });
    });
  });

  // test delete a class
  // Given the user is logged in / HOD / ValidID => return 201
  // given class id is wrong throw error 404 class not found
  describe("Delete an class", () => {
    it("return 403 Unauthorized", async () => {
      const result = await supertest(app).delete(
        `/api/classes/${class_data._id}`,
      );

      expect(result.status).toBe(403);
      expect(result.body).toMatchObject({
        message: "Unauthorized! Please Login",
      });
    });

    it("return 201 successful", async () => {
      const result = await supertest(app)
        .delete(`/api/classes/${class_data._id}`)
        .set("Cookie", cookie);

      expect(result.status).toBe(201);
      expect(result.body).toMatchObject({
        success: true,
        message: "Class has been deleted",
      });
    });

    it("return 404 class not found", async () => {
      const result = await supertest(app)
        .delete(`/api/classes/${id}`)
        .set("Cookie", cookie);

      expect(result.status).toBe(404);
      expect(result.body).toMatchObject({
        success: false,
        message: "Class not found",
      });
    });
  });
});
