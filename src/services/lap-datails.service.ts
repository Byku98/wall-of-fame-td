import { leaderboardRepository } from "../repositories/lap-details.repository";
import { LapDetails, riderHistory } from "../types/lap-details"; // Import shared interface

export const lapDetailsService = {
  getLapDetails: async (
    lapTime: string,
    riderName: string,
    motorcycle: string,
    lap_date: string
  ): Promise<LapDetails | null> => {
    console.log("Lap Details Service Loaded");

    const rows = await leaderboardRepository.getLapDetails(
      lapTime,
      riderName,
      motorcycle,
      lap_date
    );

    console.log("I'm here!!!!!!!!!");

    // List all rows with their indexes for debugging
    rows.forEach((row: LapDetails, index: number) => {
      console.log(`Row ${index}:`, row);
    });

    return rows[0] || null; // Return the first object or null if no rows
  },

  getRiderLapHistory: async (riderName: string, trackName: string): Promise<riderHistory[]> => {
    console.log("Fetching rider lap history for:", riderName, "in track ", trackName);

    const rows = await leaderboardRepository.getRiderLapHistory(riderName, trackName);

    return rows as riderHistory[]; // Return all rows for the rider
  },
};
