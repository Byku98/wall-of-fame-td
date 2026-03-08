import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import { renderLeaderboardPage, getFilteredLeaderboardData } from "../controllers/leaderboard.controller";
import { getLapDetails } from "../controllers/lap-details.controller";

const router = Router();

router.get(ROUTES.PAGES.LEADERBOARD, renderLeaderboardPage);
router.get(ROUTES.API.LEADERBOARD.FILTER, getFilteredLeaderboardData);
router.get(`${ROUTES.PAGES.LAP_DETAILS}/:lapTime/:riderName/:motorcycle/:lap_date/:trackName`, getLapDetails);

export default router;