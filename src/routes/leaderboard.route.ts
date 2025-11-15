import { Router } from "express";
import { renderLeaderboardPage, getFilteredLeaderboardData } from "../controllers/leaderboard.controller";
import { getLapDetails } from "../controllers/lap-details.controller";

const router = Router();

// Root route → landing page
router.get("/leaderboard", renderLeaderboardPage);

// Route to get filtered leaderboard data via AJAX
router.get("/leaderboard/filter", getFilteredLeaderboardData);

// Change from query params to URL params
router.get('/lap-details/:lapTime/:riderName/:motorcycle/:lap_date', getLapDetails);

export default router;