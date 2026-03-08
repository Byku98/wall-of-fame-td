"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landing_route_1 = __importDefault(require("./landing.route"));
const leaderboard_route_1 = __importDefault(require("./leaderboard.route"));
// import aboutRoutes from "./about.routes";
// import contactRoutes from "./contact.routes";
// (you can add more as your app grows)
const router = (0, express_1.Router)();
// Mount sub-routes
router.use("/", landing_route_1.default); // landing page at "/"
router.use("/", leaderboard_route_1.default); // router.use("/about", aboutRoutes);
// router.use("/contact", contactRoutes);
exports.default = router;
//# sourceMappingURL=pages.route.js.map