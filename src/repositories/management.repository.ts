import { pool } from "../config/add-laptime.database.config";

export const managementRepository = {
  /**
   * Verifies if a token matches a specific lap ID and returns the lap/contact data.
   */
  getLapWithToken: async (lap_id: string, token: string) => {
    const query = `SELECT * FROM submission_approval where lap_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [lap_id, token]);
    return rows[0] || null;
  },

  /**
   * Updates the status of a lap time.
   */
  updateStatus: async (id: string, status: string, reason: string | null = null) => {
    try {
      const query = `UPDATE laps SET status = ?, rejection_reason = ? WHERE id = ?`;
      const [result]: any = await pool.query(query, [status, reason, id]);
      
      return {
        success: result.affectedRows > 0,
        message: result.affectedRows > 0 ? "Status updated" : "Nie znaleziono rekordu do aktualizacji."
      };
    } catch (error: any) {
      console.error("Database Error in updateStatus:", error);
      return { success: false, message: `Błąd bazy danych: ${error.message}` };
    }
  }
};