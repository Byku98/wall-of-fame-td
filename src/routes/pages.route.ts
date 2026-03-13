import { Router } from "express";
import { ROUTES } from "../config/routes.config";
// Import your specific route modules
import leaderboardRoute from "./leaderboard.route";
import addLaptimeRoute from "./add-laptime.route";
import managementRoute from "./management.route";
import findTrackDayRoute from "./find-track-day.route";
import renderPrivacyPolicyPage from "./privacy-policy.route";

const router = Router();

// Redirect root to leaderboard
router.get(ROUTES.PAGES.ROOT, (req, res) => res.redirect(ROUTES.PAGES.LEADERBOARD));

// Mount other specific route modules
// These modules should define their own full paths (e.g., /leaderboard, /add-laptime)
router.use(leaderboardRoute);
router.use(addLaptimeRoute);
router.use(managementRoute);
router.use(findTrackDayRoute);
router.use(renderPrivacyPolicyPage);

export default router;