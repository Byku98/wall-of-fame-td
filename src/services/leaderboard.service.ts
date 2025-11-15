import { leaderboardRepository } from "../repositories/leaderboard.repository";

export const leaderboardService = {
  getAllTracks: async () => {
    return leaderboardRepository.getAllTracks();
  },

  getLeaderboardByTrack: async (trackName: string) => {
    return leaderboardRepository.getLeaderboardFromTrackUnfiltered(trackName);
  }
};
