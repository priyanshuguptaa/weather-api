import { Router } from 'express';
import locationController from './location/location.router.js';
import weatherController from './weather/weather.router.js';


const api = Router()
  .use(locationController)
  .use(weatherController)


export default Router().use('/api', api);