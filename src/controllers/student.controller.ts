import { Request, Response, NextFunction } from "express";
import * as services from "../services/student.service";
import * as userServices from "../services/user.service";
import { generateRandomAvatar } from "../utils/avatar.util";
import { IVerifyOptions } from "passport-local";
import "../configs/passport.config";
import passport from "passport";
import { HttpException } from "../httpexception/httpExceptions";
import { StudentDocument } from "../models/student.model";
import { excelToJson } from "../utils/excel.util";
import { IStudentUpload } from "../interfaces/student.interface";
import { UserDocument } from "../models/user.model";
import { UserType } from "../interfaces/user.interface";
import { Types } from "mongoose";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile_picture = await generateRandomAvatar(req.body.reg_number);

    const user: UserDocument = await userServices.CreateUser({
      username: req.body.reg_number,
      password: req.body.password,
      type: UserType.STUDENT,
    });
    const new_user = await services.CreateStudent({
      ...req.body,
      user_id: user.id,
      profile_picture,
    });

    res
      .status(201)
      .json({ message: "User created", success: true, data: new_user });
  } catch (error) {
    next(error);
  }
};

export const uploadStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /**This Controller is used to Register a class list of students to the database
     * with an association to their class
     */

    const student_list: IStudentUpload[] = excelToJson(
      req.files?.class_list.path,
    );

    const registered: StudentDocument[] = [];

    for (const student of student_list) {
      const user = await userServices.CreateUser({
        username: student["registration_number"],
        password: student["registration_number"],
        type: UserType.STUDENT,
      });

      const new_user = await services.CreateStudent({
        ...req.body,
        user_id: user._id,
        full_name: student.last_name + student.first_name,
        reg_number: student["registration_number"],
        password: student["registration_number"],
      });

      console.log(new_user.reg_number);

      registered.push(new_user);
    }

    res.status(201).json({
      message: "Students Created Successfully",
      success: true,
      data: registered,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    (err: Error, user: StudentDocument, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw new HttpException(401, info.message);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        res.status(201).json({
          message: `Logged in as: ${req.user?.email}`,
          success: true,
          data: req.user,
        });
      });
    },
  )(req, res, next);
};

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract parameters from the query string
    const { limit, order, ...filter } = req.query;

    // Call the dynamic GetStudents function with parameters
    const students = await services.GetStudents(
      filter,
      limit ? Number(limit) : undefined,
      order as "asc" | "desc" | undefined,
    );

    res.json({ data: students, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter = { user_id: req.params.id };
  try {
    const student = await services.GetStudent(filter);

    res.status(201).json({ success: true, message: student });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = await services.UpdateStudent(req.user?._id, req.body);

    res.json({
      data: student,
      message: "Student successfully updated",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id as unknown as Types.ObjectId;
  try {
    await services.UpdateStudent(userId, { is_deleted: true });

    res
      .status(201)
      .json({ message: "Student has been deleted", success: true });
  } catch (error) {
    next(error);
  }
};
