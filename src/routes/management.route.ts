import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { 
  approveLap, 
  rejectLap, 
  getModifyLapPage, 
  postModifyLap 
} from "../controllers/management.controller";

const router = Router();

/**
 * Route to approve a lap time.
 * URL: /api/laps/approve/:id?token=...
 */
router.get(`${ROUTES.API.LAPS.APPROVE}/:id`, approveLap);

/**
 * Route to reject/delete a lap time.
 * URL: /api/laps/reject/:id?token=...
 */
router.get(`${ROUTES.API.LAPS.REJECT}/:id`, rejectLap);

/**
 * Route to display the modification page.
 * URL: /api/laps/modify/:id?token=...
 */
router.get(`${ROUTES.API.LAPS.MODIFY}/:id`, getModifyLapPage);

/**
 * Route to handle the submission of modified data.
 */
router.post(`${ROUTES.API.LAPS.MODIFY}/:id`, postModifyLap);

export default router;