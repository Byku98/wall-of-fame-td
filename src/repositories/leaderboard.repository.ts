import { pool } from "../config/leaderboard.database.config";

export const leaderboardRepository = {
  getAllTracks: async () => {
    const [rows] = await pool.query("select track_id, track_name from tracks");
    return rows;
  },

  getLapsFromTrackUnfiltered: async (trackId: number) => {
    const [rows] = await pool.query(
      "SELECT * FROM leaderboard_get_all_tack_laps WHERE track_id = ? ORDER BY lap_time",
      [trackId]
    );
    return rows as { id: number; name: string }[];
  },
};
