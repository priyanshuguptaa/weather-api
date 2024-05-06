import { locationIdSchema } from "../schema/weather.schema.js";


export function validateParamsLocationId(req, res, next) {
    const { error } = locationIdSchema.validate(req.params);
    if (error) {
      const validationError = new Error(error.message);
      validationError.type = "VALIDATION";
      return next(validationError); // Pass the error to the error handling middleware
    }
    next();
  }