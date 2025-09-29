import { pool } from "../config/leaderboard.database.config";

export async function getAllTracks() {
  const [rows] = await pool.query("select * from leaderboard_get_all_tack_laps where track_id = 1;");
  return rows as { id: number; name: string }[];
}