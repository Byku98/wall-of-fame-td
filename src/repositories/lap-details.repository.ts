import { pool } from "../config/leaderboard.database.config";

export const leaderboardRepository = {
  getLapDetails: async (lapTime: string, riderName: string, motorcycle: string, lap_date: string) => {
    const [rows] = await pool.query(
      "SELECT * FROM rider_lap_details WHERE lap_time = ? AND rider_name = ? AND motorcycle = ? AND lap_date = ?",
      [lapTime, riderName, motorcycle, lap_date]
    );

    return rows as any[];
  },
};
