import { mailClient } from "../clients/mail.client";
import { managementRepository } from "../repositories/management.repository";

export const managementService = {
  /**
   * Approves a lap time after verifying the token.
   */
  approveLap: async (id: string, token: string) => {
    const lap = await managementRepository.getPendingLapWithToken(id, token);
    if (!lap) throw new Error("Nieprawidłowy token lub ID okrążenia.");

    const dbResult = await managementRepository.managePendingLapStatus(
      id,
      "approved",
    );
    if (!dbResult.success) throw new Error(dbResult.message);

    // Send Email using data from DB
    if (lap.contact) {
      await mailClient.sendApprovalEmail(lap.contact);
    }

    return { success: true, lap_id: lap.lap_id, contact: lap.contact };
  },

  rejectLap: async (id: string, token: string, reason: string) => {
    const lap = await managementRepository.getPendingLapWithToken(id, token);
    if (!lap) throw new Error("Nieprawidłowy token lub ID okrążenia.");

    const dbResult = await managementRepository.managePendingLapStatus(
      id,
      "rejected",
    );
    if (!dbResult.success) throw new Error(dbResult.message);

    // Send Email using data from DB
    if (lap.contact) {
      await mailClient.sendRejectionEmail(lap.contact, reason);
    }

    return { success: true, lap_id: lap.lap_id, contact: lap.contact };
  },

  /**
   * Manages pending motorcycle (approve/delete) after verifying the token.
   */
  managePendingMotorcycle: async (
    id: string,
    token: string,
    action: "approve" | "delete",
    newName?: string,
    newYear?: number,
    newType?: string,
  ) => {
    const motorcycle = await managementRepository.getPendingMotorcycleWithToken(
      id,
      token,
    );
    if (!motorcycle) throw new Error("Nieprawidłowy token lub ID motocykla.");

    const dbResult = await managementRepository.managePendingMotorcycle(
      id,
      action,
      newName !== undefined ? newName : null, // Pass null if undefined
      newYear !== undefined ? newYear : null, // Pass null if undefined
      newType !== undefined ? newType : null  // Pass null if undefined
    );
    if (!dbResult.success) throw new Error(dbResult.message);

    // TODO: Send email notification for motorcycle approval/rejection

    return { success: true, id: motorcycle.id };
  },

  /**
   * Manages pending front and/or rear tyres (approve/reject/modify) after verifying the token.
   */
  managePendingTyres: async (
    tfId: string | null,
    trId: string | null,
    token: string,
    action: "approve" | "delete",
    newNameTf?: string | null,
    newNameTr?: string | null,
  ) => {
    let contactEmail: string | null = null;
    let currentTfName: string | null = null;
    let currentTrName: string | null = null;

    if (tfId) {
      const tyreFront = await managementRepository.getPendingTyreFrontWithToken(tfId, token);
      if (!tyreFront) throw new Error("Nieprawidłowy token lub ID opony przedniej.");
      contactEmail = tyreFront.contact_email;
      currentTfName = tyreFront.name;
    }

    if (trId) {
      const tyreRear = await managementRepository.getPendingTyreRearWithToken(trId, token);
      if (!tyreRear) throw new Error("Nieprawidłowy token lub ID opony tylnej.");
      // If both are present, ensure contact emails match or handle appropriately
      if (contactEmail && contactEmail !== tyreRear.contact_email) {
        console.warn("Contact emails for front and rear tyres do not match.");
      }
      contactEmail = tyreRear.contact_email;
      currentTrName = tyreRear.name;
    }

    if (!tfId && !trId) {
      throw new Error("Brak ID opony przedniej lub tylnej do zarządzania.");
    }

    // Determine actions for front and rear based on overall action
    let actionTf: "approve" | "delete" | null = null;
    let actionTr: "approve" | "delete" | null = null;

    if (action === "approve") {
      actionTf = tfId ? "approve" : null;
      actionTr = trId ? "approve" : null;
    } else if (action === "delete") {
      actionTf = tfId ? "delete" : null;
      actionTr = trId ? "delete" : null;
    } else if (action === "modify") {
      // For modify, the action passed to SP is null, and names are used for update
      actionTf = null;
      actionTr = null;

      // Validation for modify action
      if (tfId && !newNameTf) {
        throw new Error("Brak nowej nazwy dla opony przedniej do modyfikacji.");
      }
      if (trId && !newNameTr) {
        throw new Error("Brak nowej nazwy dla opony tylnej do modyfikacji.");
      }
    } else {
      throw new Error("Nieprawidłowa akcja dla zarządzania oponami.");
    }

    const dbResult = await managementRepository.managePendingTyres(
      tfId,
      trId,
      actionTf,
      actionTr,
      newNameTf !== undefined ? newNameTf : null, // Pass null if undefined
      newNameTr !== undefined ? newNameTr : null  // Pass null if undefined
    );
    if (!dbResult.success) throw new Error(dbResult.message);

    // Return the ID of the first available tyre for consistency, and the contact email
    return { success: true, id: (tfId || trId), contact: contactEmail, currentTfName, currentTrName };
  },

  /**
   * Manages pending rider (approve/delete) after verifying the token.
   */
  managePendingRider: async (riderId: number, token: string, action: "approve" | "delete", rejectionReason?: string) => {
    const rider = await managementRepository.getPendingRiderWithToken(riderId, token);
    
    if (!rider) throw new Error("Nieprawidłowy token lub ID zawodnika.");

    const dbResult = await managementRepository.managePendingRider(riderId, action);
    
    if (!dbResult.success) throw new Error(dbResult.message);

    // Send Email based on action
    if (rider.contact_email) {
      if (action === "approve") {
        await mailClient.sendRiderApprovalEmail(rider.contact_email);
      } else if (action === "delete") {
        // As per instruction, rejectionReason is not used in the email for now
        await mailClient.sendRiderRejectionEmail(rider.contact_email, rejectionReason || "Twój profil zawodnika został odrzucony."); 
      }
    }

    return { success: true, id: rider.id, contact: rider.contact_email };
  }
};
