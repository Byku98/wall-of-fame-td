import { leaderboardRepository } from "../repositories/leaderboard.repository";

export const leaderboardService = {
  getAllTracks: async () => {
    return leaderboardRepository.getAllTracks;
  },

  getLapsByTrack: async (trackId: number) => {
    return leaderboardRepository.getLapsFromTrackUnfiltered(trackId);
  }
};