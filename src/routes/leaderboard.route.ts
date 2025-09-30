import { Router } from "express";
import { renderLeaderboardPage, getFilteredLeaderboardData } from "../controllers/leaderboard.controller";

const router = Router();

// Root route → landing page
router.get("/leaderboard", renderLeaderboardPage);

// Route to get filtered leaderboard data via AJAX
router.get("/leaderboard/filter", getFilteredLeaderboardData);

export default router;