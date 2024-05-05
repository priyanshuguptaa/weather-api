import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const errorMiddleware = (err, req, res, next) => {
  let errorResponse = {
    error: {
      message: err.message.replaceAll("\\", "").replaceAll('"', ""),
    },
  };

  if (err.type == "VALIDATION") {
    errorResponse.error.reason = ReasonPhrases.BAD_REQUEST;
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  } else if (err.type == "CONTROLLER") {
    errorResponse.error.reason = ReasonPhrases.BAD_REQUEST;
    res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  } else if (err.type == "DATABASE") {
    errorResponse.error.message = "Internal server error occurred while processing the request";
    errorResponse.error.reason = ReasonPhrases.INTERNAL_SERVER_ERROR;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};
