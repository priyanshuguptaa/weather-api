import axios from "axios";
import { geocodeApiPath } from "../../../helper/apiPaths.js";

export default class LocationService {
  static async fetchLatLong(name) {
    try {
      name = name?.trim()?.toLowerCase();
      let apiUrl = geocodeApiPath(name);
      const response = await axios.get(apiUrl);
      let data = response?.data;

      if (!data?.length) {
        let err = new Error("Can't find lat & long based on the provided location");
        err.type = "SERVICE";
        throw err;
      }

      const { lat, lon } = data?.[0];

      return { lat, long: lon };
    } catch (error) {
      console.error(error);
      let err = new Error(error.message);
      err.type = "SERVICE";
      throw err;
    }
  }
}
