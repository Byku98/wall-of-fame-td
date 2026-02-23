import { pool } from "../config/add-laptime.database.config";

export const managementRepository = {
  /**
   * Verifies if a token matches a specific lap ID and returns the lap/contact data.
   */
  getPendingLapWithToken: async (lap_id: string, token: string) => {
    const query = `SELECT * FROM submission_validation where lap_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [lap_id, token]);
    return rows[0] || null;
  },

  /**
   * Verifies if a token matches a specific pending motorcycle ID and returns its data.
   */
  getPendingMotorcycleWithToken: async (motorcycle_id: string, token: string) => {
    const query = `SELECT * from motorcycles where motorcycle_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [motorcycle_id, token]);
    return rows[0] || null;
  },

  /**
   * Verifies if a token matches a specific pending front tyre ID and returns its data.
   */
  getPendingTyreFrontWithToken: async (tyre_front_id: string, token: string) => {
    const query = `SELECT * from tyres_front where tf_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [tyre_front_id, token]);
    return rows[0] || null;
  },

  /**
   * Verifies if a token matches a specific pending rear tyre ID and returns its data.
   */
  getPendingTyreRearWithToken: async (tyre_rear_id: string, token: string) => {
    const query = `SELECT * from tyres_rear where tr_id = ? AND token_hash = ?`;
    const [rows]: any = await pool.query(query, [tyre_rear_id, token]);
    return rows[0] || null;
  },

  /**
   * Updates the status of a lap time in the database.
   * Handles custom SQL signals (e.g., SQLSTATE '45000').
   */
  managePendingLapStatus: async (id: string, status: string) => {
    try {
      const query = `CALL manage_pending_laps(?, ?)`;
      await pool.query(query, [id, status]);
      return { success: true, message: "Status updated" };
    } catch (error: any) {
      console.error("Database Error in updateStatus:", error.message);
      return {
        success: false,
        message: error.sqlMessage || error.message || "Wystąpił błąd bazy danych.",
      };
    }
  },

  /**
   * Approves or rejects a pending motorcycle.
   */
  managePendingMotorcycle: async (
    id: string,
    action: "approve" | "delete",
    newName?: string | null,
    newYear?: number | null,
    newType?: string | null,
  ) => {
    try {
      const query = `CALL manage_pending_motorcycle(?, ?, ?, ?, ?)`;
      await pool.query(query, [
        id,
        action,
        newName,
        newYear,
        newType,
      ]);

      // console.log(`Motorcycle with ID ${id} has been ${action}d.`);
      // console.log(query, [id, action, newName, newYear, newType]);
      return { success: true, message: "Motorcycle managed" };
    } catch (error: any) {
      console.error("Database Error in managePendingMotorcycle:", error.message);
      return {
        success: false,
        message: error.sqlMessage || error.message || "Wystąpił błąd bazy danych.",
      };
    }
  },

  /**
   * Approves or rejects pending tyres.
   */
  managePendingTyres: async (
    tfId: string | null,
    trId: string | null,
    actionTf: "approve" | "delete" | null, // Changed type to match SP ENUM
    actionTr: "approve" | "delete" | null, // Changed type to match SP ENUM
    newNameTf: string | null, // Changed to non-optional, explicitly null
    newNameTr: string | null, // Changed to non-optional, explicitly null
  ) => {
    try {
      const query = `CALL manage_pending_tyres(?, ?, ?, ?, ?, ?)`;
      await pool.query(query, [
        tfId,
        trId,
        actionTf,
        actionTr,
        newNameTf,
        newNameTr,
      ]);
      return { success: true, message: "Tyres managed" };
    } catch (error: any) {
      console.error("Database Error in managePendingTyres:", error.message);
      return {
        success: false,
        message: error.sqlMessage || error.message || "Wystąpił błąd bazy danych.",
      };
    }
  },
};
