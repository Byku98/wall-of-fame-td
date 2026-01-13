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
    const [rows] = await pool.query("select * from tyres_front_all");
    return rows as any[];
  },

  /**
   * Retrieves all rear tyre models from the `tyres_rear_all` view/table.
   * @returns {Promise<any[]>} Array of rear tyre objects.
   */
  getAllTyresRear: async () => {
    const [rows] = await pool.query("select * from tyres_rear_all");
    return rows as any[];
  },

  /**
   * Fetches a comprehensive list of motorcycles from the `motorcycles_all` view/table.
   * @returns {Promise<any[]>} Array of motorcycle objects.
   */
  getAllMotorcycles: async () => {
    const [rows] = await pool.query("select * from motorcycles_all");
    return rows as any[];
  },

  /**
   * Fetches riders who have previously recorded times on a specific track.
   * Used for autocomplete suggestions in the UI.
   * @param {string} trackName - The name of the track to filter riders by.
   * @returns {Promise<any[]>} Array of rider objects associated with the track.
   */
  getRidersFromTrack: async (trackName: string) => {
    const [rows] = await pool.query(
      "select * from riders_from_track where track_name = ?",
      [trackName]
    );
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
      [trackName]
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

    try {
      const query = `CALL insert_new_lap(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
        data.youtubeProof || null,
        data.proof_image_path,
        data.deviceRecordedLap || null,
      ];

      // console.log("Executing query:", query);

      const [result]: any = await pool.query(query, values);

      // console.log("Stored procedure result:", result);
      // console.log("Stored procedure result 0:", result[0]);
      // console.log("Stored procedure result 00:", result[0][0]);

      // MySQL przy CALL zwraca tablicę, gdzie pierwszy element to zestaw danych z SELECTów wewnątrz procedury
      const procData = Array.isArray(result) ? result[0] : null;

      if (procData && Array.isArray(procData) && procData[0]) {
        const statusInfo = procData[0]; // Pierwszy wiersz z pierwszego SELECTa

        if (statusInfo.error || statusInfo.status === "error") {
          return {
            success: false,
            message:
              statusInfo.message || statusInfo.error || "Błąd procedury.",
          };
        }
      }

      return {
        success: true,
        message: "New lap time entry created successfully.",
      };
    } catch (error: any) {
      console.error("Database Error in createLaptime:", error);

      // Map technical errors MySQL to readable messages
      let friendlyMessage = "Wystąpił nieoczekiwany błąd bazy danych.";

      if (error.code === "ER_PROCACCESS_DENIED_ERROR") {
        friendlyMessage = "Błąd uprawnień: Serwer nie pozwala na zapis danych (EXECUTE DENIED). Skontaktuj się z administratorem.";
      }
      
      return {
        success: false,
        message: friendlyMessage,
        technicalDetails: error.message
      };
    }
  },
};
