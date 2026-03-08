"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRepository = void 0;
const leaderboard_database_config_1 = require("../config/leaderboard.database.config");
exports.leaderboardRepository = {
    getAllTracks: async () => {
        const [rows] = await leaderboard_database_config_1.pool.query("select track_name from tracks");
        return rows;
    },
    getLeaderboardFromTrackUnfiltered: async (trackName) => {
        const [rows] = await leaderboard_database_config_1.pool.query("SELECT * FROM leaderboard_all_track_laps_unique WHERE track_name = ?", [trackName]);
        // Cast to a more specific type if you have one, otherwise 'any[]' is fine for now
        return rows;
    },
    getRiderLapsAll: async (riderName) => {
        const [rows] = await leaderboard_database_config_1.pool.query("SELECT * from rider_laptimes_all where rider_name = ?", [riderName]);
        return rows;
    }
};
//# sourceMappingURL=leaderboard.repository.js.map