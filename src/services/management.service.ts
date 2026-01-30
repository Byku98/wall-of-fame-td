import { mailClient } from "../clients/mail.client";
import { managementRepository } from "../repositories/management.repository";

export const managementService = {
  /**
   * Approves a lap time after verifying the token.
   */
  approveLap: async (id: string, token: string) => {
    const lap = await managementRepository.getLapWithToken(id, token);
    
    if (!lap) {
      throw new Error("Nieprawidłowy token lub ID okrążenia.");
    }

    // NEW: Handle potential errors during status update
    const dbResult = await managementRepository.updateStatus(id, 'approved');

    if (!dbResult.success) {
      throw new Error(dbResult.message); // Propagate the DB error message
    }

    // if (lap.contact_email) {
    //   try {
    //     await mailClient.sendApprovalEmail(lap.contact_email, lap.rider_name, lap.lap_time);
    //   } catch (mailError) {
    //     console.error("Failed to send approval email:", mailError);
    //   }
    // }

    // Return details for the controller to display
    return { 
      success: true, 
      lap_id: lap.lap_id, 
      contact: lap.contact 
    };
  },

  rejectLap: async (id: string, token: string, reason: string) => {
    const lap = await managementRepository.getLapWithToken(id, token);
    
    if (!lap) {
      throw new Error("Nieprawidłowy token lub ID okrążenia.");
    }

    // NEW: Handle potential errors during status update
    const dbResult = await managementRepository.updateStatus(id, 'rejected');

    if (!dbResult.success) {
      throw new Error(dbResult.message); // Propagate the DB error message
    }

    // Send Rejection Email
    // if (lap.contact) {
    //   try {
    //     // Note: Using lap.contact and lap.lap_id based on your getLapWithToken return structure
    //     await mailClient.sendRejectionEmail(lap.contact, lap.rider_name || "Zawodnik", reason);
    //   } catch (mailError) {
    //     console.error("Failed to send rejection email:", mailError);
    //   }
    // }

    // Return details for the controller to display
    return { 
      success: true, 
      lap_id: lap.lap_id, 
      contact: lap.contact 
    };
  }
};