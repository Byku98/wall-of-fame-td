import { leaderboardRepository } from "../repositories/leaderboard.repository";

export const leaderboardService = {
  getAllTracks: async () => {
    return leaderboardRepository.getAllTracks();
  },

  getLeaderboardByTrack: async (trackId: number) => {
    return leaderboardRepository.getLeaderboardFromTrackUnfiltered(trackId);
  }
};