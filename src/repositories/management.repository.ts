import { pool } from "../config/add-laptime.database.config";

export const managementRepository = {
  /**
   * Verifies if a token matches a specific lap ID and returns the lap/contact data.
   */
  getLapWithToken: async (id: string, token: string) => {
    const query = `
      SELECT l.*, lt.contact_email 
      FROM laps l
      JOIN lap_tokens lt ON l.id = lt.lap_id
      WHERE l.id = ? AND lt.token = ?
    `;
    const [rows]: any = await pool.query(query, [id, token]);
    return rows[0] || null;
  },

  /**
   * Updates the status of a lap time.
   */
  updateStatus: async (id: string, status: string, reason: string | null = null) => {
    const query = `UPDATE laps SET status = ?, rejection_reason = ? WHERE id = ?`;
    await pool.query(query, [status, reason, id]);
  }
};