import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { 
  approveLap, 
  getRejectLapPage, 
  postRejectLap,
  manageMotorcycle,
  postModifyMotorcycle,
  getManageTyrePage,
  postManageTyre,
  getManageRiderPage, // Renamed import
  postRejectRider 
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
 * Routes to manage motorcycles.
 * URL: /api/management/motorcycle/:id?token=...&action=approve|delete|modify
 */
router.get(`${ROUTES.API.MANAGEMENT.MOTORCYCLE}/:id`, manageMotorcycle);
router.post(`${ROUTES.API.MANAGEMENT.MOTORCYCLE}/:id`, postModifyMotorcycle);

/**
 * Routes to manage tyres.
 * URL: /api/management/tyre/:tfId?/:trId?token=...&action=approve|delete|modify
 */
router.get(`${ROUTES.API.MANAGEMENT.TYRE}/:tfId?/:trId?`, getManageTyrePage);
router.post(`${ROUTES.API.MANAGEMENT.TYRE}/:tfId?/:trId?`, postManageTyre);

// NEW: Routes to manage new riders (single endpoint for GET actions)
/**
 * Route to manage a new rider (approve/delete).
 * GET /api/management/rider/:id?token=...&action=approve|delete
 */
router.get(`${ROUTES.API.MANAGEMENT.RIDER}/:id`, getManageRiderPage); // Updated function call

/**
 * Route to post rejection for a new rider with a cause.
 * POST /api/management/rider/:id?token=...
 */
router.post(`${ROUTES.API.MANAGEMENT.RIDER}/:id`, postRejectRider);

export default router;