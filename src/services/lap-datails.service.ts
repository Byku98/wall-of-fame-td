import { leaderboardRepository } from "../repositories/lap-details.repository";

export const lapDetailsService = {


  getLapDetails: async (lapTime: string, riderName: string, motorcycle: string, lap_date: string) => {
    console.log("Lap Details Service Loaded");

    const [rows] = await leaderboardRepository.getLapDetails(lapTime, riderName, motorcycle, lap_date);
    return (rows as any[]);
  }

};
