import { Router } from "express";
import { renderLandingPage } from "../controllers/landing.controller";

const router = Router();

// Root route → landing page
router.get("/", renderLandingPage);

export default router;