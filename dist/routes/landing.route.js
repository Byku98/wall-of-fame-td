"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const landing_controller_1 = require("../controllers/landing.controller");
const router = (0, express_1.Router)();
// Root route → landing page
router.get("/", landing_controller_1.renderLandingPage);
exports.default = router;
//# sourceMappingURL=landing.route.js.map