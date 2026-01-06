import { Router } from 'express';
import {getAddLaptime, getMotorcyclesJson, getTyresFrontJson, getTyresRearJson, getRidersFromTrackJson} from '../controllers/add-laptime.controller';

const router = Router();

// GET request to display the add laptime form
router.get('/add-laptime', getAddLaptime);

// NEW: API endpoints for fetching data as JSON
router.get('/add-laptime/api/motorcycles', getMotorcyclesJson);
router.get('/add-laptime/api/tyres/front', getTyresFrontJson);
router.get('/add-laptime/api/tyres/rear', getTyresRearJson);
router.get('/add-laptime/api/riders/:trackName', getRidersFromTrackJson);

// POST request to handle form submission (uncomment when controller function is ready)
// router.post('/', addLaptimeController.postAddLaptime);

export default router;