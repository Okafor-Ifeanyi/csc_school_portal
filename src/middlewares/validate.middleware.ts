import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

const validate = (schema: AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => {
        return {
          message: i.message,
          path: i.path[0],
        };
      });

      res.status(422).json({ error: message, success: false });
    }
  };
};

export default validate;
