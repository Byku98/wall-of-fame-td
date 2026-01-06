import { pool } from "../config/add-laptime.database.config";

export const addLaptimeRepository = {
  getAllTracks: async () => {
    const [rows] = await pool.query("select track_name from tracks");
    return rows as any[];
  },

  getAllTyresFront: async () => {
    const [rows] = await pool.query("select * from tyres_front_all");
    return rows as any[];
  },

  getAllTyresRear: async () => {
    const [rows] = await pool.query("select * from tyres_rear_all");
    return rows as any[];
  },

  getAllMotorcycles: async () => {
    const [rows] = await pool.query("select * from motorcycles_all");
    return rows as any[];
  },

  getRidersFromTrack: async (trackName: string) => {
    const [rows] = await pool.query(
      "select * from riders_from_track where track_name = ?",
      [trackName]
    );
    return rows as any[];
  },
};
