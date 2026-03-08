"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredLeaderboardData = void 0;
exports.renderLeaderboardPage = renderLeaderboardPage;
const leaderboard_service_1 = require("../services/leaderboard.service");
async function renderLeaderboardPage(req, res) {
    try {
        const trackList = await leaderboard_service_1.leaderboardService.getAllTracks();
        let leaderboard = [];
        let trackId_selected = null;
        // Determine the trackId to use for initial load
        let trackIdToLoad;
        // 1. Check if a trackId is provided in the query string
        if (req.query.trackId) {
            const parsedTrackId = parseInt(req.query.trackId, 10);
            if (!isNaN(parsedTrackId)) {
                trackIdToLoad = parsedTrackId;
            }
        }
        // 2. If no trackId from query, use the first track from the trackList as default
        // if (!trackIdToLoad && trackList.length > 0) {
        // trackIdToLoad = (trackList[0] as any).track_id; // Assuming track_id is on the first item
        // }
        // console.log(trackList);
        const dynamicContent = {
            title: "Wall of Fame - Leaderbaord",
            logo: "/images/wof-internal/wof-logo-big.png",
            trackList,
            leaderboard,
            selectedTrackId: trackId_selected
        };
        res.render("leaderboard", dynamicContent);
    }
    catch (err) {
        console.log("Error fetching track list: ", err);
        res.status(500).send("Internal Server Error");
    }
}
const getFilteredLeaderboardData = async (req, res) => {
    const { trackName } = req.query; // Change from trackId
    if (!trackName || typeof trackName !== 'string') {
        return res.status(400).json({ error: 'Invalid trackName' });
    }
    try {
        const laps = await leaderboard_service_1.leaderboardService.getLeaderboardByTrack(trackName); // Update service to accept string
        res.json(laps);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
exports.getFilteredLeaderboardData = getFilteredLeaderboardData;
//# sourceMappingURL=leaderboard.controller.js.map