import { Router } from "express";
import LocationController from "./location.controller.js";
import { validateLocationData, validateParamsLocationId, validateUpdateLocationData } from "./middleware/location.middleware.js";

const router = Router();

// Route to create a new location
router.post("/locations",validateLocationData, LocationController.createLoction);

// Route to fetch all locations
router.get("/locations", LocationController.fetchAllLocation);

// Route to fetch a location by its ID
router.get("/locations/:id",validateParamsLocationId, LocationController.fetchLocationById);

// Route to update a location by its ID
router.put("/locations/:id",validateParamsLocationId,validateUpdateLocationData, LocationController.updateLocationById);

// Route to delete a location by its ID
router.delete("/locations/:id",validateParamsLocationId, LocationController.deleteLocationById);

export default router;
