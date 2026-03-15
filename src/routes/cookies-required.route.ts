import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { renderCookiesRequiredPage } from "../controllers/cookies-required.controller";  // NEW: Import the controller

const router = Router();

// Define the specific route for /cookies-required
router.get(ROUTES.PAGES.COOKIES_REQUIRED, renderCookiesRequiredPage);

export default router;  // This exports the router, which is correct