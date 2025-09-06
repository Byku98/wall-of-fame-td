import { Router } from "express";
import { renderLeaderboardPage } from "../controllers/leaderboard.controller";

const router = Router();

// Root route → landing page
router.get("/leaderboard", renderLeaderboardPage);

export default router;