import axios from "axios";
import { weatherDataApiPath } from "../../../helper/apiPaths.js";
import logger from "../../../config/logger.js";

export default class WeatherService {
  static async fetchWeatherData(lat, lon) {
    try {
      let apiUrl = weatherDataApiPath(lat, lon);

      logger.info({
        message: 'Fetching weather data',
        method: 'GET',
        url: apiUrl,
      });

      const response = await axios.get(apiUrl);

      if(!response?.data){
        let err = new Error("No weather information found");
        err.type = "SERVICE";
        throw err;
      }

      return response?.data;

    } catch (error) {
        let err = new Error(error.message);
        err.type = "SERVICE";
        throw err;
    }
  }
}
