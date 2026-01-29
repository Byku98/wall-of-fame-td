import { pool } from "../config/add-laptime.database.config";

export const managementRepository = {
  /**
   * Verifies if a token matches a specific lap ID and returns the lap/contact data.
   */
  getLapWithToken: async (lap_id: string, token: string) => {
    const query = `SELECT * FROM submission_validation where lap_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [lap_id, token]);
    return rows[0] || null;
  },

  /**
   * Updates the status of a lap time in the database.
   * Handles custom SQL signals (e.g., SQLSTATE '45000').
   */
  updateStatus: async (id: string, status: string) => {
    try {
      const query = `CALL manage_pending_laps(?, ?)`;
      
      // We don't need to destructure or inspect 'result' here because 
      // the database will throw an error (caught below) if the update fails.
      await pool.query(query, [id, status]);

      return {
        success: true,
        message: "Status updated"
      };
    } catch (error: any) {
      // This block correctly catches SIGNAL SQLSTATE '45000' from your procedure
      console.error("Database Error in updateStatus:", error.message);
      
      return { 
        success: false, 
        // error.sqlMessage contains the text from your SIGNAL MESSAGE_TEXT
        message: error.sqlMessage || error.message || "Wystąpił błąd bazy danych." 
      };
    }
  }
};