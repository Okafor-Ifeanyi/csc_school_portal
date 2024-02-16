// register student
// given wrong schema return 422
// given regnumber exists return 400 `User with email ${username} already exists`
// given students id doesn't exist throw 422 "students does not exist"
// given registered return 201

// upload students
// given user is not HOD return 403 "Unauthorized! Please Login as HOD"
// given schema is wrong return 422

// test get all students
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// Given requests are satisfied return 201

// test get single student
// given the :id isn't valid return 404
// given successful 201

// test updating an student
// Given the user isn't logged in return 403 "Unauthorized! Please Login"
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// Given wrong schema return 422
// given user not found 404
// Successful 201

// test delete an student
// Given the user is not HOD return 403 "Unauthorized! Please Login as HOD"
// given student id is wrong throw error 404 student not found
// Given successful return 201 { message: "Student has been deleted"}

import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createServer } from "../configs/server.config";
import {
  createClass,
  //   id,
  //   updatestudents,
  //   createstudents,
  //   createstudents201,
  //   createstudents422,
  registerAdminAdvisor,
} from "./payload";
import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";
import { StudentDocument } from "../models/student.model";

const app = createServer();
let cookie: any = "";
let data: Partial<UserDocument> = {};
let class_data: Partial<StudentDocument> = {};

describe("students", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    process.env.DATABASE_URI = mongoServer.getUri();
    await mongoose.connect(mongoServer.getUri());

    // Create students User
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

    // create a students
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

  it("testing", () => {
    expect(class_data).toBe(class_data)
    expect(true).toBe(true);
  });
  // create students
  // given the user isn't logged in
  // given the schema is wrong
  // given the advisor ID is invalid
  // given the user is logged in and schema is validated return 201
  // given students name already exist
  // describe("Create a students", () => {
  //   it("return 403 user unauthorized", async () => {
  //     const result = await supertest(app)
  //       .post("/api/students/")
  //       .send({ ...createstudents, advisor_id: data._id });

  //     expect(result.status).toBe(403);
  //     expect(result.body).toMatchObject({
  //       message: "Unauthorized! Please Login",
  //     });
  //   });
  //   it("return 422 schema error", async () => {
  //     const result = await supertest(app)
  //     .post("/api/students/")
  //     .set("Cookie", cookie)
  //     .send({ ...createstudents422, advisor_id: data._id });

  //     expect(result.status).toBe(422);
  //   });
  //   it("return 403 advisor_id invalid", async () => {
  //     const result = await supertest(app)
  //     .post("/api/students/")
  //     .set("Cookie", cookie)
  //     .send({ ...createstudents201, advisor_id: id });

  //     expect(result.status).toBe(403);
  //     expect(result.body.message).toBe("Provided Advisor ID is not an Advisor");
  //   });
  //   it("return 201 successful", async () => {
  //     const result = await supertest(app)
  //     .post("/api/students/")
  //     .set("Cookie", cookie)
  //     .send({ ...createstudents201, advisor_id: data._id });

  //     expect(result.status).toBe(201);
  //     expect(result.body.data).toMatchObject({
  //       enrollement_year: createstudents201.enrollement_year,
  //       advisor_id: data._id,
  //       createdAt: expect.any(String),
  //     });
  //   });
  //   it("return 400 name already exists", async () => {
  //     const result = await supertest(app)
  //     .post("/api/students/")
  //     .set("Cookie", cookie)
  //     .send({ ...createstudents201, advisor_id: data._id });

  //     console.log(result.body)
  //     expect(result.status).toBe(400);
  //     expect(result.body).toMatchObject({
  //       message: `students with name ${createstudents201.name} already exists`,
  //       success: false,
  //     });
  //   });
  // });

  // test get single students
  // given the :id is valid return 201
  // given data isnt found return 404
  //   describe("Get a students", () => {
  //     describe("by ID", () => {
  //       it("return 404 user not found", async () => {
  //         const id = "65c1080efed4dc964597dbad";

  //         const result = await supertest(app).get(`/api/students/${id}`);
  //         expect(result.status).toBe(404);
  //         expect(result.body).toMatchObject({
  //           message: "Could not find students",
  //         });
  //       });

  //       it("return 201 successful", async () => {
  //         const result = await supertest(app).get(
  //           `/api/students/${students_data._id}`,
  //         );
  //         // .set("Cookie", cookie);

  //         expect(result.status).toBe(200);
  //         expect(result.body.data).toMatchObject({
  //           enrollement_year: createstudents.enrollement_year,
  //           advisor_id: data._id,
  //           createdAt: expect.any(String),
  //         });
  //       });
  //     });
  //   });

  // test get all students
  // Given the user is logged in
  // Given the params are in place return
  // Successful
  //   describe("Get All students", () => {
  //     it("return 403 Unauthorized", async () => {
  //       const result = await supertest(app).get(`/api/students/`);

  //       expect(result.status).toBe(403);
  //       expect(result.body).toMatchObject({
  //         message: "Unauthorized! Please Login",
  //       });
  //     });

  //     it("return 200 successful", async () => {
  //       const result = await supertest(app)
  //         .get(`/api/students/`)
  //         .set("Cookie", cookie);

  //       expect(result.status).toBe(200);
  //       expect(result.body).toMatchObject({
  //         success: true,
  //       });
  //     });
  //   });

  // test updating a students
  // Given the user is logged in Correct Schema / ValidID => return 201
  // Given wrong ID return 404 students not found
  //   describe("Update an students", () => {
  //     it("return 403 Unauthorized", async () => {
  //       const result = await supertest(app).patch(
  //         `/api/students/${students_data._id}`,
  //       );

  //       expect(result.status).toBe(403);
  //       expect(result.body).toMatchObject({
  //         message: "Unauthorized! Please Login",
  //       });
  //     });

  //     it("return 201 successful", async () => {
  //       const result = await supertest(app)
  //         .patch(`/api/students/${students_data._id}`)
  //         .set("Cookie", cookie)
  //         .send(updatestudents);

  //       expect(result.status).toBe(201);
  //       expect(result.body).toMatchObject({
  //         success: true,
  //         message: "students successfully updated",
  //       });
  //       expect(result.body.data).toMatchObject({
  //         department: updatestudents.department,
  //       });
  //     });

  //     it("return 404 students not found", async () => {
  //       const result = await supertest(app)
  //         .patch(`/api/students/${id}`)
  //         .set("Cookie", cookie)
  //         .send(updatestudents);

  //       expect(result.status).toBe(404);
  //       expect(result.body).toMatchObject({
  //         success: false,
  //         message: "students not found",
  //       });
  //     });
  //   });

  // test delete a students
  // Given the user is logged in / HOD / ValidID => return 201
  // given students id is wrong throw error 404 students not found
  //   describe("Delete an students", () => {
  //     it("return 403 Unauthorized", async () => {
  //       const result = await supertest(app).delete(
  //         `/api/students/${students_data._id}`,
  //       );

  //       expect(result.status).toBe(403);
  //       expect(result.body).toMatchObject({
  //         message: "Unauthorized! Please Login",
  //       });
  //     });

  //     it("return 201 successful", async () => {
  //       const result = await supertest(app)
  //         .delete(`/api/students/${students_data._id}`)
  //         .set("Cookie", cookie);

  //       expect(result.status).toBe(201);
  //       expect(result.body).toMatchObject({
  //         success: true,
  //         message: "students has been deleted",
  //       });
  //     });

  //     it("return 404 students not found", async () => {
  //       const result = await supertest(app)
  //       .delete(`/api/students/${id}`)
  //       .set("Cookie", cookie);

  //       expect(result.status).toBe(404);
  //       expect(result.body).toMatchObject({
  //         success: false,
  //         message: "students not found",
  //       });
  //     });
  //   });
});
