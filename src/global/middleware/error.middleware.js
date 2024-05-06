import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logger from "../../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {

  logger.error({
    message: err.message,
    stack: err.stack,
    type: err.type
  })

  let errorResponse = {
    error: {
      message: err.message.replaceAll("\\", "").replaceAll('"', ""),
    },
  };

  if (err.type == "VALIDATION") {
    errorResponse.error.reason = ReasonPhrases.BAD_REQUEST;
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  } else if (err.type == "CONTROLLER" || err.type == "SERVICE") {
    errorResponse.error.reason = ReasonPhrases.BAD_REQUEST;
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  } else if (err.type == "DATABASE") {
    errorResponse.error.message = "Internal server error occurred while processing the request";
    errorResponse.error.reason = ReasonPhrases.INTERNAL_SERVER_ERROR;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};
