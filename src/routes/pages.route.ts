import { Router } from "express";
import landingRoutes from "./landing.route";
// import aboutRoutes from "./about.routes";
// import contactRoutes from "./contact.routes";
// (you can add more as your app grows)

const router = Router();

// Mount sub-routes
router.use("/", landingRoutes);   // landing page at "/"
// router.use("/about", aboutRoutes);
// router.use("/contact", contactRoutes);

export default router;