"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardService = void 0;
const leaderboard_repository_1 = require("../repositories/leaderboard.repository");
exports.leaderboardService = {
    getAllTracks: async () => {
        return leaderboard_repository_1.leaderboardRepository.getAllTracks();
    },
    getLeaderboardByTrack: async (trackName) => {
        return leaderboard_repository_1.leaderboardRepository.getLeaderboardFromTrackUnfiltered(trackName);
    }
};
//# sourceMappingURL=leaderboard.service.js.map