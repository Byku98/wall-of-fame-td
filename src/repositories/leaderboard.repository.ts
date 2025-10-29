import { pool } from "../config/leaderboard.database.config";

export const leaderboardRepository = {
  getAllTracks: async () => {
    const [rows] = await pool.query("select track_name from tracks");
    return rows as any[];
  },

  getLeaderboardFromTrackUnfiltered: async (trackName: string) => {
    const [rows] = await pool.query(
      "SELECT * FROM leaderboard_get_all_track_laps_unique WHERE track_name = ?",
      [trackName]
    );
    // Cast to a more specific type if you have one, otherwise 'any[]' is fine for now
    return rows as any[];
  },

  getRiderLapsAll: async (riderName: string) => {
    const [rows] = await pool.query(
      "SELECT * from rider_get_laptimes_all where rider_name = ?",
      [riderName]
    );
    return rows as any[];
  },

  getLapDetails: async (lapTime: string, riderName: string, motorcycle: string, lap_date: Date) => {
    const [rows] = await pool.query(
      "SELECT * FROM leaderboard_get_all_tack_laps WHERE lap_time = ? AND rider_name = ? AND motorcycle = ? AND lap_date = ?",
      [lapTime, riderName, motorcycle, lap_date]
    );
    return rows as any[];
  },
};
