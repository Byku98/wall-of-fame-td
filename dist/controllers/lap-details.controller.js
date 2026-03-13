"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRiderLapHistory = exports.getLapDetails = void 0;
const lap_datails_service_1 = require("../services/lap-datails.service");
const translations_1 = require("../utils/translations");
const formatters_1 = require("../utils/formatters");
const getLapDetails = async (req, res) => {
    // Destructure parameters to match leaderboard.service.ts::getLapDetails signature
    const { lapTime, riderName, motorcycle, lap_date, trackName } = req.params;
    // console.log("Fetching lap details for:", {
    //   lapTime,
    //   riderName,
    //   motorcycle,
    //   lap_date,
    // });
    let lapDetails = null;
    let riderHistory = null;
    // First try: Fetch and process lapDetails
    try {
        lapDetails = await lap_datails_service_1.lapDetailsService.getLapDetails(lapTime, riderName, motorcycle, lap_date);
        // console.log("Lap details retrieved:", lapDetails);
        if (!lapDetails) {
            throw new Error("Lap details not found");
        }
        // console.log("Lap details after translation:", lapDetails);
        // Format lap_time server-side for consistent display
        lapDetails.lap_time = (0, formatters_1.formatLapTime)(lapDetails.lap_time);
        lapDetails.lap_date = (0, formatters_1.convertMysqlToDate)(lapDetails.lap_date);
        lapDetails = (0, translations_1.translateObject)(lapDetails, ["sex", "rider_level", "validity"], "pl");
    }
    catch (error) {
        res
            .status(404)
            .render("error", { title: "Błąd", message: "Okrążenie nie znalezione" });
        return; // Exit early on lapDetails failure
    }
    // Second try: Fetch and process riderHistory (optional, don't throw on failure)
    try {
        riderHistory = await lap_datails_service_1.lapDetailsService.getRiderLapHistory(riderName, trackName);
        // console.log("Lap history:", riderHistory);
        if (riderHistory) {
            // Format each lap_time and lap_date for display
            riderHistory.forEach(lap => {
                lap.lap_time = (0, formatters_1.formatLapTime)(lap.lap_time);
                lap.lap_date = (0, formatters_1.convertMysqlToDate)(lap.lap_date);
            });
        }
    }
    catch (error) {
        console.log("Historia nie znaleziona:");
        riderHistory = null; // Set to null to allow rendering without history
    }
    // Render with both (riderHistory may be null)
    res.render("lap-details", {
        lapDetails,
        riderHistory,
    });
};
exports.getLapDetails = getLapDetails;
const getRiderLapHistory = async (req, res) => {
    const { riderName, trackName } = req.params;
    console.log("Fetching lap history for rider:", riderName);
    try {
        const lapHistory = await lap_datails_service_1.lapDetailsService.getRiderLapHistory(riderName, trackName);
        if (!lapHistory || lapHistory.length === 0) {
            throw new Error("Historia nie znaleziona");
        }
        // Format each lap_time and lap_date for display
        lapHistory.forEach(lap => {
            lap.lap_time = (0, formatters_1.formatLapTime)(lap.lap_time);
            lap.lap_date = (0, formatters_1.convertMysqlToDate)(lap.lap_date);
        });
        // Return JSON for dynamic loading into a div
        res.json({ lapHistory, riderName });
    }
    catch (error) {
        res.status(404).json({ error: "Historia nie znaleziona" });
    }
};
exports.getRiderLapHistory = getRiderLapHistory;
//# sourceMappingURL=lap-details.controller.js.map