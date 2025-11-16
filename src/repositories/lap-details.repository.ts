import { pool } from "../config/leaderboard.database.config";
import { LapDetails } from "../types/lap-details"; // Import shared interface for type safety

export const leaderboardRepository = {
  getLapDetails: async (lapTime: string, riderName: string, motorcycle: string, lap_date: string): Promise<LapDetails[]> => {
    const [rows] = await pool.query(
      "SELECT * FROM rider_lap_details WHERE lap_time = ? AND rider_name = ? AND motorcycle = ? AND lap_date = ?",
      [lapTime, riderName, motorcycle, lap_date]
    );

    return rows as LapDetails[]; // Cast to typed array to enforce interface
  },
};