const validate = (schema) => {
  return (req, res, next) => {
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
