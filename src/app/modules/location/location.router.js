import { Router } from "express";
import LocationController from "./location.controller.js";

const router = Router();

// Route to create a new location
router.post("/locations", LocationController.createLoction);

// Route to fetch all locations
router.get("/locations", LocationController.fetchAllLocation);

// Route to fetch a location by its ID
router.get("/locations/:id", LocationController.fetchLocationById);

// Route to update a location by its ID
router.put("/locations/:id", LocationController.updateLocationById);

// Route to delete a location by its ID
router.delete("/locations/:id", LocationController.deleteLocationById);

export default router;
