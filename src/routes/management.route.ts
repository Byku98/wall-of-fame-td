import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { 
  approveLap, 
  getRejectLapPage, 
  postRejectLap,
  manageMotorcycle,
  postModifyMotorcycle // NEW: Import the new controller function
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
router.get(`${ROUTES.API.LAPS.REJECT}/:id`, getRejectLapPage);
router.post(`${ROUTES.API.LAPS.REJECT}/:id`, postRejectLap);

/**
 * Routes to manage motorcycles and tyres.
 * URL: /api/management/motorcycle/:id?token=...&action=approve|delete|modify
 * URL: /api/management/tyre/:tfId?/:trId?token=...&action=approve|delete|modify
 * Note: tfId and trId are optional, but at least one must be present.
 */
router.get(`${ROUTES.API.MANAGEMENT.MOTORCYCLE}/:id`, manageMotorcycle); // Changed from POST to GET

// NEW: POST route for handling motorcycle modification form submission
router.post(`${ROUTES.API.MANAGEMENT.MOTORCYCLE}/:id`, postModifyMotorcycle);

// router.post(`${ROUTES.API.MANAGEMENT.TYRE}/:tfId?/:trId?`, manageTyre); // New combined tyre route

export default router;