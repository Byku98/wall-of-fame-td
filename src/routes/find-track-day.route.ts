import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { renderFindTrackDayPage } from "../controllers/find-track-day.controller";

const router = Router();

// Define the specific route for /find-track-day
router.get(ROUTES.PAGES.FIND_TRACK_DAY, renderFindTrackDayPage);

export default router;