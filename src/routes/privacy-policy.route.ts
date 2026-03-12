import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { renderPrivacyPolicyPage } from "../controllers/privacy-policy.controller";

const router = Router();

// Define the specific route for /privacy-policy
router.get(ROUTES.PAGES.PRIVACY_POLICY, renderPrivacyPolicyPage);

export default router;