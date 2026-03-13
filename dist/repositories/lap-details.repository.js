"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRepository = void 0;
const leaderboard_database_config_1 = require("../config/leaderboard.database.config");
exports.leaderboardRepository = {
    getLapDetails: async (lapTime, riderName, motorcycle, lap_date) => {
        const [rows] = await leaderboard_database_config_1.pool.query("SELECT * FROM rider_lap_details WHERE lap_time = ? AND rider_name = ? AND motorcycle = ? AND lap_date = ?", [lapTime, riderName, motorcycle, lap_date]);
        return rows; // Cast to typed array to enforce interface
    },
    getRiderLapHistory: async (riderName, trackName) => {
        const [rows] = await leaderboard_database_config_1.pool.query("SELECT * FROM rider_laptimes_all where rider_name = ? and track_name = ? and status = 'approved' order by lap_time asc", [riderName, trackName]);
        return rows; // Cast to typed array
    },
};
//# sourceMappingURL=lap-details.repository.js.map