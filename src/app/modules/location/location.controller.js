
import locationDBService from "../database/locationDb.service.js"

export default class LocationController {
    
    static async createLoction(req, res, next){
        try{
           const result = await locationDBService.insert({name:"abc",lat:122434,long:4345})
           res.json(result)
        } catch(error){
            next(error)
        }
    }

    static async fetchAllLocation(req, res){}

    static async fetchLocationById(req, res){}

    static async updateLocationById(req, res){}
    
    static async deleteLocationById(req, res){}
}