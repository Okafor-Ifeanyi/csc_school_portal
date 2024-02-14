// register class
// given the user is logged in and a hod and schema is validated
// given the user isn't logged in
// given the user is not a hod
// given the schema is wrong
// given the advisor ID is valid
// given class name doesn't exist

// test get all classes
// Given the user is logged in and a HOD
// Given the params are in place return
// Successful

// test get single class
// given the :id is valid return
// given data isnt found return 404
// given :id isnt valid return 404

// test updating an class
// Given the user is logged in / HOD / Correct Schema / ValidID => return 201
// Given wrong ID return 404 class not found

// test delete an class
// Given the user is logged in / HOD / ValidID => return 201
// given class id is wrong throw error 404 class not found

import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import { createClass, registerAdminAdvisor, updateClass } from "./payload";
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

  // test get all classes
  describe("Get an Class", () => {
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

        // console.log(result.body)
        expect(result.status).toBe(201);
        expect(result.body.data).toMatchObject({
          enrollement_year: createClass.enrollement_year,
          createdAt: expect.any(String),
        });
      });
    });

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
          message: "class successfully updated",
        });
        expect(result.body.data).toMatchObject({
          department: updateClass.department,
        });
      });
    });

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
          message: "class has been deleted",
        });
      });
    });
  });
});
