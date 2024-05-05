import Joi from "joi";

export const createLocationSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "name must be a string",
    "any.required": "name is required",
  }),
  lat: Joi.number().precision(6).required().messages({
    "number.base": "lat must be a number",
    "any.required": "lat is required",
  }),
  long: Joi.number().precision(6).required().messages({
    "number.base": "long must be a number",
    "any.required": "long is required",
  }),
}).options({ abortEarly: false });

export const updateLocationSchema = Joi.object({
  name: Joi.string().max(255).optional().messages({
    "string.base": "name must be a string",
  }),
  lat: Joi.number().precision(6).optional().messages({
    "number.base": "lat must be a number",
  }),
  long: Joi.number().precision(6).optional().messages({
    "number.base": "long must be a number",
  }),
}).options({ abortEarly: false });

export const locationIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "string.base": "id must be a string",
    "any.required": "id is required",
  }),
}).options({ abortEarly: false });
