import { Request, Response, NextFunction } from "express";
import { HttpException } from "../httpexception/httpExceptions.js";

const errorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    message,
    success: false,
  });
};

export default errorHandler;
