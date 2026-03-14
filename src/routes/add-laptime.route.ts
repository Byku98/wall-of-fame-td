import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import {
  getAddLaptime,
  getMotorcyclesJson,
  getTyresFrontJson,
  getTyresRearJson,
  getRidersFromTrackJson,
  getOrganizersByTrackJson,
  postAddLaptime
} from "../controllers/add-laptime.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

// GET request to display the add laptime form
router.get(ROUTES.PAGES.ADD_LAPTIME, getAddLaptime);

// API endpoints for fetching data as JSON
router.get(ROUTES.API.LAPS.MOTORCYCLES, getMotorcyclesJson);
router.get(ROUTES.API.LAPS.TYRES_FRONT, getTyresFrontJson);
router.get(ROUTES.API.LAPS.TYRES_REAR, getTyresRearJson);
router.get(`${ROUTES.API.LAPS.RIDERS}/:trackName`, getRidersFromTrackJson);
router.get(`${ROUTES.API.LAPS.ORGANIZERS}/:trackName`, getOrganizersByTrackJson);

// POST request to handle form submission with file upload
router.post(ROUTES.API.LAPS.CREATE, upload.single("proofImage"), postAddLaptime);

export default router;
