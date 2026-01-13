import { Router } from "express";
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
router.get("/add-laptime", getAddLaptime);

// NEW: API endpoints for fetching data as JSON
router.get("/add-laptime/api/motorcycles", getMotorcyclesJson);
router.get("/add-laptime/api/tyres/front", getTyresFrontJson);
router.get("/add-laptime/api/tyres/rear", getTyresRearJson);
router.get("/add-laptime/api/riders/:trackName", getRidersFromTrackJson);
router.get("/add-laptime/api/organizers/:trackName", getOrganizersByTrackJson);

// POST request to handle form submission with file upload
router.post("/add-laptime/api", upload.single("proofImage"), postAddLaptime);

export default router;
