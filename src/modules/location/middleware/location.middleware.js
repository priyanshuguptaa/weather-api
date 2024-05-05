import { createLocationSchema, locationIdSchema, updateLocationSchema } from "../schema/location.schema.js";

export function validateLocationData(req, res, next) {
  const { error } = createLocationSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.message);
    validationError.type = "VALIDATION";
    return next(validationError); // Pass the error to the error handling middleware
  }
  next();
}

export function validateUpdateLocationData(req, res, next) {
  const { error } = updateLocationSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.message);
    validationError.type = "VALIDATION";
    return next(validationError); // Pass the error to the error handling middleware
  }
  next();
}

export function validateParamsLocationId(req, res, next) {
  const { error } = locationIdSchema.validate(req.params);
  if (error) {
    const validationError = new Error(error.message);
    validationError.type = "VALIDATION";
    return next(validationError); // Pass the error to the error handling middleware
  }
  next();
}
