import { pool } from "../config/leaderboard.database.config";

export const leaderboardRepository = {
  getAllTracks: async () => {
    const [rows] = await pool.query("select track_name from tracks");
    return rows as any[];
  },

  getLeaderboardFromTrackUnfiltered: async (trackName: string) => {
    const [rows] = await pool.query(
      "SELECT * FROM leaderboard_all_track_laps_unique WHERE track_name = ? and status = 'active'",
      [trackName]
    );
    // Cast to a more specific type if you have one, otherwise 'any[]' is fine for now
    return rows as any[];
  },

  getRiderLapsAll: async (riderName: string) => {
    const [rows] = await pool.query(
      "SELECT * from rider_laptimes_all where rider_name = ? and status = 'active'",
      [riderName]
    );
    return rows as any[];
  }
};
