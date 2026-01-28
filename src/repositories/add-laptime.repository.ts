import { pool } from "../config/add-laptime.database.config";

/**
 * Repository for handling database operations related to adding lap times.
 * Provides methods to fetch metadata for form population and saving new records.
 */
export const addLaptimeRepository = {
  /**
   * Fetches a list of all available tracks from the database.
   * @returns {Promise<any[]>} Array of track objects containing `track_name`.
   */
  getAllTracks: async () => {
    const [rows] = await pool.query("select track_name from tracks");
    return rows as any[];
  },

  /**
   * Fetches a list of all timing devices supported by the system.
   * @returns {Promise<any[]>} Array of device objects containing `device_name`.
   */
  getAllDevices: async () => {
    const [rows] = await pool.query("select device_name from devices");
    return rows as any[];
  },

  /**
   * Retrieves all front tyre models from the `tyres_front_all` view/table.
   * @returns {Promise<any[]>} Array of front tyre objects.
   */
  getAllTyresFront: async () => {
    const [rows] = await pool.query("select * from tyres_front_all where status = true");
    return rows as any[];
  },

  /**
   * Retrieves all rear tyre models from the `tyres_rear_all` view/table.
   * @returns {Promise<any[]>} Array of rear tyre objects.
   */
  getAllTyresRear: async () => {
    const [rows] = await pool.query("select * from tyres_rear_all where status = true");
    return rows as any[];
  },

  /**
   * Fetches a comprehensive list of motorcycles from the `motorcycles_all` view/table.
   * @returns {Promise<any[]>} Array of motorcycle objects.
   */
  getAllMotorcycles: async () => {
    const [rows] = await pool.query("select * from motorcycles_all where status = true");
    return rows as any[];
  },

  /**
   * Fetches riders who have previously recorded times on a specific track.
   * Used for autocomplete suggestions in the UI.
   * @param {string} trackName - The name of the track to filter riders by.
   * @returns {Promise<any[]>} Array of rider objects associated with the track.
   */
  getAllRiders: async (trackName: string) => {
    const [rows] = await pool.query("select * from riders_all", [trackName]);
    return rows as any[];
  },

  /**
   * Retrieves a list of organizers associated with a specific track.
   * @param {string} trackName - The name of the track to filter organizers by.
   * @returns {Promise<any[]>} Array of organizer objects.
   */
  getOrganizersFromTrack: async (trackName: string) => {
    const [rows] = await pool.query(
      "select * from track_organizers where track_name = ?",
      [trackName],
    );
    return rows as any[];
  },

  /**
   * Creates a new lap time entry in the database by calling the `insert_new_lap` stored procedure.
   * @param {any} data - The complete lap time data object from the service.
   * @returns {Promise<{success: boolean, insertedId?: number, message: string}>} Result of the insertion.
   */
  createLaptime: async (data: any) => {
    console.log("Creating new lap time with data:", data);

    let connection;
    
    try {
      // 1. Get a dedicated connection from the pool
      connection = await pool.getConnection();

      // 2. Execute the CALL (this sets @out_id on THIS connection only)
      const callQuery = `CALL insert_new_lap(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @out_id)`;
      const values = [
        data.lapTime,
        data.lapDate,
        data.riderName,
        data.device,
        "MEDIUM",
        data.trackName,
        data.organizer,
        data.motorcycle,
        data.tyreFront || null,
        data.tyreRear || null,
        data.deviceRecordedLap || null,
        data.proof_image_path,
        data.youtubeProof || null,
        data.status
      ];

      const [callResult]: any = await connection.query(callQuery, values);

      // 3. Retrieve the ID (guaranteed to be from the CALL above because it's the same connection)
      const [idResult]: any = await connection.query(
        "SELECT @out_id AS insertedId",
      );

      // Check for procedure-level errors
      if (callResult && callResult[0] && callResult[0][0]) {
        const statusInfo = callResult[0][0];
        if (statusInfo.error || statusInfo.status === "error") {
          return {
            success: false,
            message:
              statusInfo.message || statusInfo.error || "Błąd procedury.",
          };
        }
      }

      const insertedId =
        idResult && idResult[0] ? idResult[0].insertedId : null;

      return {
        success: true,
        insertedId: insertedId,
        message: "New lap time entry created successfully.",
      };
    } catch (error: any) {

      console.error("Database Error in createLaptime:", error);
      let friendlyMessage = "Wystąpił nieoczekiwany błąd bazy danych.";

      if (error.code === "ER_PROCACCESS_DENIED_ERROR") {
        friendlyMessage =
          "Błąd uprawnień: Serwer nie pozwala na zapis danych (EXECUTE DENIED).";
      }

      return {
        success: false,
        message: friendlyMessage,
        technicalDetails: error.message,
      };

    } finally {
      // 4. CRITICAL: Release the connection back to the pool
      if (connection) connection.release();
    }
  },

  /**
   * Saves a unique edit token for a specific lap entry.
   */
  saveLapToken: async (lapId: number, contact: string, submissionToken: string) => {
    const query = `CALL insert_new_token(?, ?, ?)`;
    await pool.query(query, [lapId, contact, submissionToken]);
  },
};
