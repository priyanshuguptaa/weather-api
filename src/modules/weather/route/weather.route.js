import { Router } from 'express';
import WeatherController from '../controller/weather.controller';

const router = Router();

router.get("/weather/:id",WeatherController.fetchForecast);

router.get("/history", WeatherController.fetchHistory)

export default router;