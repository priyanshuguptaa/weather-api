import { Router } from 'express';
import locationsController from './locations/locations.controller.js';
import weatherController from './weather/weather.controller.js';
import historyController from './history/history.controller.js'


const api = Router()
  .use(locationsController)
  .use(weatherController)
  .use(historyController)


export default Router().use('/api', api);