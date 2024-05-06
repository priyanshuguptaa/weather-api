import logger from "../../config/logger.js";

export default function requestLogger(req, res, next){
    logger.info({
      message: 'Incoming request',
      method: req.method,
      url: req.url,
      ip: req.ip,
      headers: req.headers,
      params: req.params,
      body: req.body,
      cookies: req.cookies
    });
    next();
  };