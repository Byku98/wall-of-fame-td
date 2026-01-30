import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { 
  approveLap, 
  rejectLap
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


export default router;