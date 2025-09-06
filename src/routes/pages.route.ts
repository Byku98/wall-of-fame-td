import { Router } from "express";
import landingRoute from "./landing.route";
import leaderboardRoute from "./leaderboard.route";
// import aboutRoutes from "./about.routes";
// import contactRoutes from "./contact.routes";
// (you can add more as your app grows)

const router = Router();

// Mount sub-routes
router.use("/", landingRoute);   // landing page at "/"
router.use("/", leaderboardRoute);// router.use("/about", aboutRoutes);
// router.use("/contact", contactRoutes);

export default router;