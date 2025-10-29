import { leaderboardRepository } from "../repositories/leaderboard.repository";

export const leaderboardService = {
  getAllTracks: async () => {
    return leaderboardRepository.getAllTracks();
  },

  getLeaderboardByTrack: async (trackName: string) => {
    return leaderboardRepository.getLeaderboardFromTrackUnfiltered(trackName);
  },

  getLapDetails: async (lapTime: string, riderName: string, motorcycle: string, lap_date: Date) => {
    const [rows] = await leaderboardRepository.getLapDetails(lapTime, riderName, motorcycle, lap_date);
    return (rows as any[])[0]; // Assuming single row
  },
};
