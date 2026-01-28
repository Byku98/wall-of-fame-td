import { mailClient } from "../clients/mail.client";
import { managementRepository } from "../repositories/management.repository";

export const managementService = {
  /**
   * Approves a lap time after verifying the token.
   */
  approveLap: async (id: string, token: string) => {
    // 1. Verify token and get lap data
    const lap = await managementRepository.getLapWithToken(id, token);
    
    if (!lap) {
      throw new Error("Nieprawidłowy token lub ID okrążenia.");
    }

    // 2. Update status in DB to 'approved'
    await managementRepository.updateStatus(id, 'approved');

    // 3. Send Email Notification to the rider
    if (lap.contact_email) {
      try {
        await mailClient.sendApprovalEmail(lap.contact_email, lap.rider_name, lap.lap_time);
      } catch (mailError) {
        console.error("Failed to send approval email:", mailError);
        // We don't throw here because the DB update was already successful
      }
    }

    return { success: true, riderName: lap.rider_name };
  },

  rejectLap: async (id: string, token: string, reason: string) => {
    const lap = await managementRepository.getLapWithToken(id, token);
    
    if (!lap) {
      throw new Error("Nieprawidłowy token lub ID okrążenia.");
    }

    // Update status to 'rejected' and store the reason
    await managementRepository.updateStatus(id, 'rejected', reason);

    if (lap.contact_email) {
      try {
        await mailClient.sendRejectionEmail(lap.contact_email, lap.rider_name, reason);
      } catch (mailError) {
        console.error("Failed to send rejection email:", mailError);
      }
    }

    return { success: true };
  }
};