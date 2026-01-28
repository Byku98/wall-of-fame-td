import { Router } from "express";
import { ROUTES } from "../config/routes.config";
import leaderboardRoute from "./leaderboard.route";
import addLaptimeRoute from "./add-laptime.route";

const router = Router();

router.get(ROUTES.PAGES.ROOT, (req, res) => res.redirect(ROUTES.PAGES.LEADERBOARD));
router.use(ROUTES.PAGES.ROOT, leaderboardRoute);
router.use(ROUTES.PAGES.ROOT, addLaptimeRoute);

export default router;