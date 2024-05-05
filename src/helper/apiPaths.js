import { PATH } from "../constants/path.constant";
import "dotenv/config";

export const geocodeApiPath = (location) => {
  const url = new URL(PATH.GEOCODE_PATH);
  url.searchParams.append("q", location);
  url.searchParams.append("limit", "1");
  url.searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY);

  return url.toString();
};

export const weatherDataApiPath = (lat, lon) => {
  const url = new URL(PATH.WEATHER_DATA);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", lon);
  url.searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY);

  return url.toString();
};
