import { Router } from 'express';
import locationController from '../modules/location/route/location.route.js';
import weatherController from '../modules/weather/route/weather.route.js';


const api = Router()
  .use(locationController)
  .use(weatherController)


export default Router().use('/api', api);