import { Router } from 'express';
import WeatherController from '../controller/weather.controller.js';

const router = Router();

router.get("/weather/:id",WeatherController.fetchForecast);

router.get("/history", WeatherController.fetchHistory)

export default router;