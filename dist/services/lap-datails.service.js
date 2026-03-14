"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lapDetailsService = void 0;
const lap_details_repository_1 = require("../repositories/lap-details.repository");
exports.lapDetailsService = {
    getLapDetails: async (lapTime, riderName, motorcycle, lap_date) => {
        const rows = await lap_details_repository_1.leaderboardRepository.getLapDetails(lapTime, riderName, motorcycle, lap_date);
        // List all rows with their indexes for debugging
        // rows.forEach((row: LapDetails, index: number) => {
        //    console.log(`Row ${index}:`, row);
        // });
        return rows[0] || null; // Return the first object or null if no rows
    },
    getRiderLapHistory: async (riderName, trackName) => {
        // console.log("Fetching rider lap history for:", riderName, "in track ", trackName);
        const rows = await lap_details_repository_1.leaderboardRepository.getRiderLapHistory(riderName, trackName);
        return rows; // Return all rows for the rider
    },
};
//# sourceMappingURL=lap-datails.service.js.map