import Joi from "joi";

export const createLocationSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "name must be a string",
    "any.required": "name is required",
  })
}).options({ abortEarly: false });

export const updateLocationSchema = Joi.object({
  name: Joi.string().max(255).optional().messages({
    "string.base": "name must be a string",
  }),
}).options({ abortEarly: false });

export const locationIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "string.base": "id must be a string",
    "any.required": "id is required",
  }),
}).options({ abortEarly: false });
