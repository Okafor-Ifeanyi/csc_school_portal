import { NextFunction, Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { DATABASE_URI, MAXAGE, SECRET } from "../configs/constants.config";
const mongoUrl = DATABASE_URI;

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: MAXAGE,
    },
    store: MongoStore.create({
      mongoUrl,
    }),
  })(req, res, next);
};

export default sessionMiddleware;
