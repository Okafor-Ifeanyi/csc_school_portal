import { NextFunction, Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { MAXAGE, SECRET } from "../configs/constants.config";

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const mongoUrl = process.env.DATABASE_URI;
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
