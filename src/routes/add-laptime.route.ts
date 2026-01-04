import { Router } from 'express';
import {getAddLaptime} from '../controllers/add-laptime.controller';

const router = Router();

// GET request to display the add laptime form
router.get('/add-laptime', getAddLaptime);

// POST request to handle form submission (uncomment when controller function is ready)
// router.post('/', addLaptimeController.postAddLaptime);

export default router;