import locationDBService from "../../database/service/locationDb.service.js";

export default class LocationController {
  static async createLoction(req, res, next) {
    try {
      let { name, lat, long } = req.body;
      name = name?.trim()?.toLowerCase();

      const isLocationExist = await locationDBService.fetchByName(name);

      if (isLocationExist?.length) {
        console.log(name,isLocationExist)
        throw new Error("Location Already exist");
      }

      const result = await locationDBService.insert({ name: name, lat: lat, long: long });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllLocation(req, res, next) {
    try {
      let skip = 0;

      let { page=0, limit=0 } = req.query;

      if (page <= 1) {
        page = 1;
      }

      if (limit <= 0 || limit > 100) {
        limit = 10;
      }

      skip = (page - 1) * limit;

      const result = await locationDBService.fetchAll(skip, limit);
      const count = await locationDBService.count();

      res.json({result,count});
    } catch (error) {
      next(error);
    }
  }

  static async fetchLocationById(req, res, next) {
    try {
      const result = await locationDBService.fetchById(req.params.id);

      if(!(result?.length)){
        throw new Error('No location found with this id')
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateLocationById(req, res, next) {
    try {

      const id = req.params.id;
      let {name,lat,long} = req.body;
      name = name.trim().toLowerCase();

      const isLocationExist = await locationDBService.fetchById(id);

      if(!(isLocationExist.length)){
        throw new Error('No location found with this id');
      }

      const isConflictLocation = await locationDBService.fetchByName(name);
      if(isConflictLocation.length){
        throw new Error('Conflict, location alrady exist with same name');
      }

      console.log("update",req.params.id, req.body)
      const payload = {
        name,
        lat,
        long
      }
      const result = await locationDBService.update(id,payload);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteLocationById(req, res, next) {
    try {
      const id = req.params.id;
      const isLocationExist = await locationDBService.fetchById(id);

      if(!(isLocationExist.length)){
        throw new Error('No location found with this id');
      }

      const result = await locationDBService.delete(id);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
