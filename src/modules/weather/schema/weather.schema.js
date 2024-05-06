import Joi from "joi";


export const locationIdSchema = Joi.object({
    id: Joi.number().required().messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
    }),
  }).options({ abortEarly: false });