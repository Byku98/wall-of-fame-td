import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import leaderboardRoute from "./leaderboard.route";
import addLaptimeRoute from "./add-laptime.route";
import managementRoute from "./management.route"; // NEW

const router = Router();

router.get(ROUTES.PAGES.ROOT, (req, res) => res.redirect(ROUTES.PAGES.LEADERBOARD));
router.use(ROUTES.PAGES.ROOT, leaderboardRoute);
router.use(ROUTES.PAGES.ROOT, addLaptimeRoute);
router.use(ROUTES.PAGES.ROOT, managementRoute); // NEW: Mount management routes

export default router;