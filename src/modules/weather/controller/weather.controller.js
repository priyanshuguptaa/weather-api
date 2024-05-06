import { StatusCodes } from "http-status-codes";
import locationDBService from "../../database/service/locationDb.service.js";
import weatherService from "../service/weather.service.js";
import cache from "../../../config/cache.js";

export default class WeatherController {
  static async fetchForecast(req, res, next) {
    try {
      const { id } = req.params;

      const [locationData] = await locationDBService.fetchById(id);

      if (!locationData) {
        if (cache.has(req.originalUrl)) {
          cache.del(req.originalUrl);
        }
        let err = new Error("No location found with this id");
        err.type = "CONTROLLER";
        throw err;
      }

      if (cache.has(req.originalUrl)) {
        res.status(StatusCodes.OK).json(cache.get(req.originalUrl));
      }

      const response = await weatherService.fetchWeatherData(locationData.lat, locationData.long);

      const successResponse = {
        success: true,
        message: "Data fetched successfully",
        data: response,
      };

      cache.set(req.originalUrl, successResponse, 600000);
      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  static async fetchHistory(req, res, next) {
    try {
      const successResponse = {
        success: true,
        message: `${req.originalUrl}`,
      };
      res.status(StatusCodes.OK).json({});
    } catch (error) {
      next(error);
    }
  }
}
