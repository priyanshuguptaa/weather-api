import { StatusCodes } from "http-status-codes";
import locationDBService from "../../database/service/locationDb.service.js";
import locationService from "../service/location.service.js";
export default class LocationController {
  static async createLoction(req, res, next) {
    try {
      let { name} = req.body;
      name = name?.trim()?.toLowerCase();

      const isLocationExist = await locationDBService.fetchByName(name);

      if (isLocationExist?.length) {
        let err = new Error("Location Already exist");
        err.type = "CONTROLLER";
        throw err;
      }

      const data = await locationService.fetchLatLong(name);

      

      const { lastID } = await locationDBService.insert({ name: name, lat: data.lat, long: data.long });

      const successResponse = {
        success: true,
        message: "Record created successfully",
        data: {
          name,
          lat: data.lat,
          long : data.long,
          id: lastID,
        },
      };

      res.status(StatusCodes.CREATED).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllLocation(req, res, next) {
    try {
      let skip = 0;

      let { page = 0, limit = 0 } = req.query;

      if (page <= 1) {
        page = 1;
      }

      if (limit <= 0 || limit > 100) {
        limit = 10;
      }

      skip = (page - 1) * limit;

      const result = await locationDBService.fetchAll(skip, limit);
      const count = await locationDBService.count();

      const successResponse = {
        success: true,
        message: "Data retrieved successfully",
        pagination: {
          total_items: Number(count),
          total_pages: Math.ceil(Number(count) / Number(limit)),
          current_page: Number(page),
          per_page: Number(limit),
        },
        data: result,
      };

      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  static async fetchLocationById(req, res, next) {
    try {
      const result = await locationDBService.fetchById(req.params.id);

      if (!result?.length) {
        let err = new Error("No location found with this id");
        err.type = "CONTROLLER";
        throw err;
      }

      const successResponse = {
        success: true,
        message: "Data retrieved successfully",
        data: result,
      };

      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  static async updateLocationById(req, res, next) {
    try {
      const id = req.params.id;
      let { name} = req.body;
      name = name.trim().toLowerCase();

      const isLocationExist = await locationDBService.fetchById(id);

      if (!isLocationExist.length) {
        let err = new Error("No location found with this id");
        err.type = "CONTROLLER";
        throw err;
      }

      const isConflictLocation = await locationDBService.fetchByName(name);
      if (isConflictLocation.length) {
        let err = new Error("Conflict, location alrady exist with same name");
        err.type = "CONTROLLER";
        throw err;
      }

      const data = await locationService.fetchLatLong(name);

      const payload = {
        name,
        lat: data.lat,
        long: data.long,
      };
      const result = await locationDBService.update(id, payload);

      const successResponse = {
        success: true,
        message: "Data updated successfully",
        data: { ...payload, id },
      };

      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  static async deleteLocationById(req, res, next) {
    try {
      const id = req.params.id;
      const isLocationExist = await locationDBService.fetchById(id);

      if (!isLocationExist.length) {
        let err = new Error("No location found with this id");
        err.type = "CONTROLLER";
        throw err;
      }

      const result = await locationDBService.delete(id);

      const successResponse = {
        success: true,
        message: "Data deleted successfully",
      };

      res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      next(error);
    }
  }
}
