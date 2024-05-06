import { Router } from 'express';
import WeatherController from '../controller/weather.controller.js';
import { validateParamsLocationId } from '../middleware/weather.middleware.js';

const router = Router();

router.get("/weather/:id",validateParamsLocationId, WeatherController.fetchForecast);

router.get("/history", WeatherController.fetchHistory)

export default router;